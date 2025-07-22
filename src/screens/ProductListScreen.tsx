import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  StatusBar,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../redux/Store/store';
import { SafeAreaView } from 'react-native-safe-area-context';
import ProductCard from '../components/Products/ProductCard';
import CategoryButton from '../components/Products/CategoryButton';
import SearchBar from '../components/Products/SearchBar';
import {
  fetchProducts,
  incrementPage,
  Product,
  clearProducts,
  setSelectedCategory,
  fetchCategories,
  fetchProductsByCategory,
  setCategoryMode,
} from '../redux/reducers/productSlice';
import { useNavigation } from '@react-navigation/native';
import { addToWhishlist } from '../redux/reducers/wishlistSlice';
import { ProductsStackParamList } from '../navigators/ProductsStack';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

type NavigationProp = NativeStackNavigationProp<
  ProductsStackParamList,
  'ProductList'
>;

const ProductListScreen = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigation = useNavigation<NavigationProp>();

  const {
    products,
    loading,
    error,
    page,
    selectedCategory,
    categories,
    isCategoryMode,
  } = useSelector((state: RootState) => state.products);

  useEffect(() => {
    dispatch(fetchProducts(page));
    dispatch(fetchCategories());
  }, [dispatch, page]);

  const handleCategoryPress = (category: string) => {
    dispatch(clearProducts());
    dispatch(setCategoryMode(true));
    dispatch(setSelectedCategory(category));
    dispatch(fetchProductsByCategory(category));
  };

  const handleLoadMore = () => {
    if (!isCategoryMode) {
      dispatch(incrementPage());
    }
  };

  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = async () => {
    setRefreshing(true);
    dispatch(clearProducts());
    await dispatch(fetchProducts(0));
    setRefreshing(false);
  };

  const renderItem = ({ item }: { item: Product }) => (
    <ProductCard
      item={item}
      onPress={() => navigation.navigate('ProductDetails', { product: item })}
      onWishlistPress={() => dispatch(addToWhishlist(item))}
    />
  );

  if (loading && products.length === 0) {
    return <ActivityIndicator size="large" />;
  }

  if (error) {
    return (
      <View style={styles.center}>
        <Text>Something Went Wrong!</Text>
        <Text
          onPress={() => dispatch(fetchProducts(page))}
          style={styles.retryText}
        >
          Retry
        </Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.Container}>
      <StatusBar barStyle="dark-content" backgroundColor="#000" />
      <SearchBar onPress={() => navigation.navigate('SearchScreen')} />
      <FlatList
        horizontal
        data={categories}
        keyExtractor={item => item.slug}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.categoryList}
        renderItem={({ item }) => {
          const isActive = item.slug === selectedCategory;
          return (
            <CategoryButton
              name={item.name}
              active={isActive}
              onPress={() => handleCategoryPress(item.slug)}
            />
          );
        }}
      />
      <FlatList
        onRefresh={onRefresh}
        refreshing={refreshing}
        data={products}
        renderItem={renderItem}
        numColumns={2}
        columnWrapperStyle={styles.row}
        keyExtractor={item => item.id.toString()}
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.5}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    backgroundColor: '#F5F6FA',
  },
  row: {
    justifyContent: 'space-around',
    paddingHorizontal: 8,
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  retryText: {
    marginTop: 12,
    fontWeight: 'bold',
    color: 'blue',
  },
  categoryList: {
    paddingHorizontal: 12,
    marginTop: 12,
  },
});

export default ProductListScreen;
