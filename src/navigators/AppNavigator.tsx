import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import AuthNavigator from './AuthNavigator';
import MainTabNavigator from './MainTabNavigator';
import { RootState } from '../redux/Store/store';
import { setUser } from '../redux/reducers/authSlice';
import * as Keychain from 'react-native-keychain';
import TokenRefresher from '../components/TokenRefresher';
const AppNavigator = () => {
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.auth.user);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadToken = async () => {
      try {
        const credentials = await Keychain.getGenericPassword();
        if (credentials) {
          console.log('🔐 Token found:', credentials.password);

          // If you have an endpoint to fetch user profile using token, call it here.
          dispatch(
            setUser({
              accessToken: credentials.password,
              id: 1,
              username: 'autologin',
              email: 'autologin@dummy.com',
              firstName: 'Auto',
              lastName: 'Login',
              gender: 'unknown',
              image: '',
              refreshToken: '', // optional
            }),
          );
        }
      } catch (error) {
        console.log('🔒 Error retrieving token:', error);
      } finally {
        setLoading(false);
      }
    };

    loadToken();
  }, [dispatch]);

  if (loading) return null; // Or a splash/loading screen

  return (
    <NavigationContainer>
      {user ? (
        <>
          <TokenRefresher />
          <MainTabNavigator />
        </>
      ) : (
        <AuthNavigator />
      )}
    </NavigationContainer>
  );
};

export default AppNavigator;
