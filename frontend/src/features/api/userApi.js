// services/userApi.js
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const userApi = createApi({
  reducerPath: 'userApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://cartzone-jobq.onrender.com/api/v1/user',
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
    getAllUsers: builder.query({
      query: () => '/get-all',
    }),
    getUser: builder.query({
      query: () => '/get-user',
    }),
    updateUser: builder.mutation({
      query: (formData) => ({
        url: '/update-user',
        method: "PATCH",
        body: formData
      })
    }),
  }),
});

// Auto-generated hooks for the endpoints
export const { useGetAllUsersQuery, useGetUserQuery, useUpdateUserMutation } = userApi;