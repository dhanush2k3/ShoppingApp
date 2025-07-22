import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

type User = {
  id: number;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  gender: string;
  image: string;
  accessToken: string;
  refreshToken: string;
};

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://dummyjson.com',
  }),
  endpoints: builder => ({
    login: builder.mutation<User, { username: string; password: string }>({
      query: ({ username, password }) => ({
        url: '/auth/login',
        method: 'POST',
        body: { username, password },
      }),
    }),
    refreshToken: builder.mutation<User, string>({
      query: refreshToken => ({
        url: '/auth/refresh',
        method: 'POST',
        body: { refreshToken },
      }),
    }),
  }),
});

export const { useLoginMutation, useRefreshTokenMutation } = authApi;
export default authApi;
