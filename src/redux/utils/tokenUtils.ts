import { jwtDecode } from 'jwt-decode';

interface DecodedToken {
  exp: number;
  iat: number;
  [key: string]: any;
}

export const getTokenExpiration = (token: string): number => {
  try {
    const decoded: DecodedToken = jwtDecode(token);
    return decoded.exp * 1000; // convert to milliseconds
  } catch (error) {
    console.error('Invalid token:', error);
    return 0;
  }
};
