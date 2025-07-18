import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import CartScreen from '../screens/CartScreen';
import WishlistScreen from '../screens/WishlistScreen';
import ProfileScreen from '../screens/ProfileScreen';
import { NavigationContainer } from '@react-navigation/native';
import CustomTabBar from '../components/CustomTabBar';
import ProductsStack from './ProductsStack';
import { ProductsStackParamList } from './ProductsStack';
import { NavigatorScreenParams } from '@react-navigation/native';
export type RootTabParamList = {
  Products: NavigatorScreenParams<ProductsStackParamList>;
  Wishlist: undefined;
  Cart: undefined;
  Profile: undefined;
};
const Tab = createBottomTabNavigator<RootTabParamList>();
const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{ headerShown: false }}
        tabBar={props => <CustomTabBar {...props} />}
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
    </NavigationContainer>
  );
};

export default AppNavigator;
