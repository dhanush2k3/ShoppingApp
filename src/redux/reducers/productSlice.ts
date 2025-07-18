import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../Api/axiosInstance';
export interface Product {
  id: number;
  title: string;
  price: number;
  thumbnail: string;
  category: string;
}
export interface Category {
  slug: string;
  name: string;
  url: string;
}
interface ProductState {
  products: Product[];
  searchResults: Product[];
  loading: boolean;
  error: boolean;
  page: number;
  categories: Category[]; // <-- not string[]
  selectedCategory: string | null;
  isCategoryMode: boolean;
}
const initialState: ProductState = {
  products: [],
  searchResults: [],
  categories: [],
  selectedCategory: null,
  loading: false,
  error: false,
  page: 0,
  isCategoryMode: false,
};

export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async (page: number) => {
    const res = await axiosInstance.get('/products', {
      params: {
        limit: 10,
        skip: page * 10,
      },
    });
    return res.data.products;
  },
);

export const searchProducts = createAsyncThunk(
  'products/search',
  async (query: string) => {
    const res = await axiosInstance.get(
      `https://dummyjson.com/products/search?q=${query}`,
    );
    const filtered = res.data.products.filter((product: Product) =>
      product.title.toLowerCase().startsWith(query.toLowerCase()),
    );
    return filtered;
  },
);

// Fetch categories
export const fetchCategories = createAsyncThunk(
  'products/fetchCategories',
  async () => {
    const res = await axiosInstance.get(
      'https://dummyjson.com/products/categories',
    );
    return res.data; // ← This should be an array of category objects
  },
);

// Fetch products by category
export const fetchProductsByCategory = createAsyncThunk(
  'products/fetchByCategory',
  async (category: string) => {
    const res = await axiosInstance.get(`/products/category/${category}`);
    return res.data.products;
  },
);

const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    incrementPage(state) {
      state.page += 1;
    },
    clearProducts(state) {
      state.products = [];
      state.page = 0;
      state.isCategoryMode = false;
    },
    setSelectedCategory(state, action) {
      state.selectedCategory = action.payload;
    },
    clearSearchResults(state) {
      state.searchResults = [];
    },
    setCategoryMode(state, action) {
      state.isCategoryMode = action.payload;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchProducts.pending, state => {
        state.loading = true;
        state.error = false;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        if (!state.isCategoryMode) {
          const newProducts = action.payload.filter(
            (p: Product) =>
              !state.products.some(existing => existing.id === p.id),
          );
          state.products.push(...newProducts);
        }
      })
      .addCase(fetchProducts.rejected, state => {
        state.loading = false;
        state.error = true;
      })
      .addCase(searchProducts.pending, state => {
        state.loading = true;
        state.error = false;
      })
      .addCase(searchProducts.fulfilled, (state, action) => {
        state.searchResults = action.payload;
        state.loading = false;
      })
      .addCase(searchProducts.rejected, state => {
        state.error = true;
        state.loading = false;
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.categories = action.payload;
      })
      .addCase(fetchProductsByCategory.pending, state => {
        state.loading = true;
        state.error = false;
      })
      .addCase(fetchProductsByCategory.fulfilled, (state, action) => {
        state.products = action.payload;
        state.isCategoryMode = true;
      })
      .addCase(fetchProductsByCategory.rejected, state => {
        state.loading = false;
        state.error = true;
      });
  },
});

export const {
  incrementPage,
  clearProducts,
  setSelectedCategory,
  clearSearchResults,
  setCategoryMode,
} = productSlice.actions;
export default productSlice.reducer;
