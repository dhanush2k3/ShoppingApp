// navigation/MainTabNavigator.tsx
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import CartScreen from '../screens/CartScreen';
import WishlistScreen from '../screens/WishlistScreen';
import ProfileScreen from '../screens/ProfileScreen';
import ProductsStack, { ProductsStackParamList } from './ProductsStack';
import CustomTabBar from '../components/CustomTabBar';
import { NavigatorScreenParams } from '@react-navigation/native';

export type RootTabParamList = {
  Products: NavigatorScreenParams<ProductsStackParamList>;
  Wishlist: undefined;
  Cart: undefined;
  Profile: undefined;
};

const Tab = createBottomTabNavigator<RootTabParamList>();

const MainTabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{ headerShown: false }}
      tabBar={props => <CustomTabBar {...props} />}
      initialRouteName="Products"
    >
      <Tab.Screen name="Products" component={ProductsStack} />
      <Tab.Screen
        name="Cart"
        component={CartScreen}
        options={{
          headerShown: true,
          headerTitle: 'Cart',
          headerTitleStyle: {
            fontSize: 30,
            fontWeight: '700',
            color: '#1e1e1e',
          },
          headerStyle: {
            backgroundColor: '#fff',
          },
        }}
      />
      <Tab.Screen
        name="Wishlist"
        component={WishlistScreen}
        options={{
          headerShown: true,
          headerTitle: 'WishList',
          headerTitleStyle: {
            fontSize: 30,
            fontWeight: '700',
            color: '#1e1e1e',
          },
          headerStyle: {
            backgroundColor: '#fff',
          },
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          headerShown: true,
          headerTitle: 'Profile',
          headerTitleStyle: {
            fontSize: 30,
            fontWeight: '700',
            color: '#1e1e1e',
          },
          headerStyle: {
            backgroundColor: '#fff',
          },
        }}
      />
    </Tab.Navigator>
  );
};

export default MainTabNavigator;
