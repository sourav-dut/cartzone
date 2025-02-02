// services/userApi.js
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const userApi = createApi({
  reducerPath: 'userApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:1800/api/v1/user',
    prepareHeaders: (headers) => {
      // Retrieve the token from localStorage
      const token = localStorage.getItem('token');

      // If the token exists, set the Authorization header
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getUsers: builder.query({
      query: () => 'users',
    }),
    getUser: builder.query({
      query: () => '/get-user',
    }),
  }),
});

// Auto-generated hooks for the endpoints
export const { useGetUsersQuery, useGetUserQuery } = userApi;