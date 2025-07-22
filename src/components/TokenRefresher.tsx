import { useEffect } from 'react';
import * as Keychain from 'react-native-keychain';
import { jwtDecode } from 'jwt-decode';
import { useRefreshTokenMutation } from '../redux/reducers/authApi';
import { useDispatch } from 'react-redux';
import { setUser, logout } from '../redux/reducers/authSlice';

interface DecodedToken {
  exp: number;
}

const TokenRefresher = () => {
  const dispatch = useDispatch();
  const [refreshTokenAPI] = useRefreshTokenMutation();

  useEffect(() => {
    let timer: NodeJS.Timeout;

    const refreshAccessToken = async () => {
      try {
        const creds = await Keychain.getGenericPassword();
        if (!creds) return;

        const refreshToken = creds.password;
        const user = await refreshTokenAPI(refreshToken).unwrap();
        dispatch(setUser(user));

        // Save new access token
        await Keychain.setGenericPassword('auth', user.accessToken);

        const decoded: DecodedToken = jwtDecode(user.accessToken);
        const timeUntilExpiry = decoded.exp * 1000 - Date.now() - 60000; // 1 min before expiry

        timer = setTimeout(refreshAccessToken, timeUntilExpiry);
      } catch (err) {
        console.error('Token refresh failed', err);
        dispatch(logout());
        await Keychain.resetGenericPassword();
      }
    };

    refreshAccessToken();

    return () => clearTimeout(timer);
  }, [dispatch, refreshTokenAPI]);

  return null;
};

export default TokenRefresher;
