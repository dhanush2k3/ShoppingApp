import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  Button,
  StatusBar,
  Dimensions,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../redux/Store/store';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { SafeAreaView } from 'react-native-safe-area-context';

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

const { width } = Dimensions.get('window');
const ITEM_WIDTH = (width - 40) / 2;

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
    <TouchableOpacity
      onPress={() => navigation.navigate('ProductDetails', { product: item })}
    >
      <View style={styles.Card}>
        <View style={styles.imageWrapper}>
          <Image source={{ uri: item.thumbnail }} style={styles.cardImage} />
          <TouchableOpacity
            style={styles.wishlistIcon}
            onPress={() => {
              dispatch(addToWhishlist(item));
            }}
          >
            <Ionicons name="heart-outline" size={23} color="#999" />
          </TouchableOpacity>
        </View>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.price}>₹{item.price}</Text>
      </View>
    </TouchableOpacity>
  );

  if (loading && products.length === 0) {
    return <ActivityIndicator size="large" />;
  }

  if (error) {
    return (
      <View style={styles.center}>
        <Text>Something Went Wrong!</Text>
        <Button title="Retry" onPress={() => dispatch(fetchProducts(page))} />
      </View>
    );
  }
  return (
    <SafeAreaView style={styles.Container}>
      <StatusBar barStyle="dark-content" backgroundColor="#black" />
      <View style={styles.searchContainer}>
        <Ionicons
          name="search-outline"
          size={22}
          color="#aaa"
          style={styles.searchIcon}
        />
        <TouchableOpacity
          style={styles.searchBar}
          onPress={() => navigation.navigate('SearchScreen')}
        >
          <Text style={styles.searchPlaceholder}>Search Products</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        horizontal
        data={categories}
        keyExtractor={item => item.slug}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.categoryList}
        renderItem={({ item }) => {
          const isActive = item.slug === selectedCategory;
          return (
            <TouchableOpacity
              onPress={() => handleCategoryPress(item.slug)}
              style={[
                styles.categoryButton,
                { backgroundColor: isActive ? '#000' : '#F6F6F6' },
              ]}
            >
              <Text
                style={[
                  styles.categoryText,
                  { color: isActive ? '#FFFFFF' : '#1E1E1E' },
                ]}
              >
                {item.name}
              </Text>
            </TouchableOpacity>
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
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    marginHorizontal: 12,
    marginTop: 15,
    marginBottom: 5,
    borderRadius: 40,
    paddingHorizontal: 12,
    height: 55,
    elevation: 6,
  },

  searchIcon: {
    marginRight: 8,
  },

  searchBar: {
    flex: 1,
    justifyContent: 'center',
  },
  searchPlaceholder: {
    color: '#000',
    fontWeight: '400',
    fontSize: 15,
  },
  Container: {
    flex: 1,
    backgroundColor: '#F5F6FA',
  },
  Card: {
    width: ITEM_WIDTH,
    margin: 6,
  },
  row: {
    justifyContent: 'space-around',
    paddingHorizontal: 8,
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
  cardImage: {
    width: '100%',
    height: 250,
    resizeMode: 'cover',
  },
  textSection: {
    paddingHorizontal: 12,
    paddingVertical: 10,
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

  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  categoryList: {
    paddingHorizontal: 12,
    marginTop: 12,
  },
  categoryButton: {
    paddingHorizontal: 16,
    paddingVertical: 8, // make sure it's not too small
    borderRadius: 25,
    marginHorizontal: 6,
    backgroundColor: '#e0e0e0',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: 45,
    marginBottom: 20,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  categoryText: {
    fontWeight: '600',
    fontSize: 14,
    textAlign: 'center',
  },
});

export default ProductListScreen;
