import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ProductListScreen from '../screens/ProductListScreen';
import ProductDetailsScreen from '../screens/ProductDetailsScreen';
import SearchScreen from '../screens/SearchScreen';
import { Product } from '../assets/types/Product';

export type ProductsStackParamList = {
  ProductList: undefined;
  ProductDetails: { product: Product };
  SearchScreen: undefined;
};

const Stack = createNativeStackNavigator<ProductsStackParamList>();

const ProductsStack = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="ProductList"
      component={ProductListScreen}
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name="ProductDetails"
      component={ProductDetailsScreen}
      options={{
        headerShown: true,
        headerTitle: 'Product Details',
        headerTitleStyle: {
          fontSize: 18,
          fontWeight: '600',
          color: '#1e1e1e',
        },
        headerStyle: {
          backgroundColor: '#fff',
        },
      }}
    />
    <Stack.Screen
      name="SearchScreen"
      component={SearchScreen}
      options={{ headerShown: true }}
    />
  </Stack.Navigator>
);

export default ProductsStack;
