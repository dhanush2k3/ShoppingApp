import React, { useEffect, useState } from 'react';
import {
  Text,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  Dimensions,
  SafeAreaView,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import {
  searchProducts,
  clearSearchResults,
  Product,
} from '../redux/reducers/productSlice';
import { AppDispatch, RootState } from '../redux/Store/store';
import { useNavigation } from '@react-navigation/native';

import { ProductsStackParamList } from '../navigators/ProductsStack';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { addToWhishlist } from '../redux/reducers/wishlistSlice';

import SearchBar from '../components/SearchProducts/SearchBar';
import ProductCard from '../components/SearchProducts/ProductCard';

const { width } = Dimensions.get('window');
const ITEM_WIDTH = (width - 40) / 2;

type NavigationProp = NativeStackNavigationProp<
  ProductsStackParamList,
  'SearchScreen'
>;

const SearchScreen = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { searchResults, loading } = useSelector(
    (state: RootState) => state.products,
  );
  const [query, setQuery] = useState('');
  const navigation = useNavigation<NavigationProp>();
  useEffect(() => {
    return () => {
      dispatch(clearSearchResults());
    };
  }, [dispatch]);

  const handleSearch = () => {
    if (query.trim()) {
      dispatch(searchProducts(query));
    }
  };

  const renderItem = ({ item }: { item: Product }) => (
    <ProductCard
      item={item}
      onPress={() => navigation.navigate('ProductDetails', { product: item })}
      onWishlistPress={() => dispatch(addToWhishlist(item))}
    />
  );

  return (
    <SafeAreaView style={styles.container}>
      <SearchBar
        value={query}
        onChangeText={setQuery}
        onSubmit={handleSearch}
      />

      {loading && <ActivityIndicator size="large" color="#000" />}

      {!loading && searchResults.length > 0 && (
        <FlatList
          data={searchResults}
          keyExtractor={item => item.id.toString()}
          renderItem={renderItem}
          numColumns={2}
          columnWrapperStyle={styles.row}
          contentContainerStyle={styles.list}
        />
      )}

      {!loading && searchResults.length === 0 && query.trim().length > 0 && (
        <Text style={styles.noResults}>No products found</Text>
      )}
    </SafeAreaView>
  );
};

export default SearchScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F4F6F8',
  },
  searchTab: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
  },
  searchInput: {
    flex: 1, // This makes the input take remaining space
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 12,
    fontSize: 16,
    borderColor: '#ccc',
    borderWidth: 1,
    marginRight: 6, // Adds space between input and button
    elevation: 4,
  },
  searchButton: {
    backgroundColor: '#000',
    paddingVertical: 10,
    paddingHorizontal: 16, // Add this for horizontal padding
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 4,
  },
  searchText: {
    color: '#fff',
    fontWeight: 'bold',
  },

  row: {
    justifyContent: 'space-around',
    paddingHorizontal: 6,
  },
  Card: {
    width: ITEM_WIDTH,
    margin: 6,
  },
  cardImage: {
    width: '100%',
    height: 250,
    resizeMode: 'cover',
  },

  imageWrapper: {
    width: '100%',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
    position: 'relative',
  },
  wishlistIcon: {
    position: 'absolute',
    top: 10,
    right: 10,
    zIndex: 1,
  },
  title: {
    fontSize: 14,
    fontWeight: '400',
    color: '#1C1C1E',
    marginTop: 6,
    marginLeft: 4,
  },
  price: {
    fontSize: 15,
    fontWeight: '600',
    color: '#000000',
    marginTop: 2,
    marginLeft: 4,
  },

  noResults: {
    textAlign: 'center',
    fontSize: 16,
    color: '#999',
    marginTop: 20,
  },
  list: {
    paddingBottom: 20,
  },
});
