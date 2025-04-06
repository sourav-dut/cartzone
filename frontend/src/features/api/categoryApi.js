// services/userApi.js
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const categoryApi = createApi({
  reducerPath: 'categoryApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://cartzone-jobq.onrender.com/api/v1/category',
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
    getAllSubSubCategory: builder.query({
      query: () => '/child-category/get',
    }),
    getAllSubCategory: builder.query({
      query: () => '/sub-category/get'
    }),
    getAllCategory: builder.query({
      query: () => '/get'
    }),
  }),
});

// Auto-generated hooks for the endpoints
export const { useGetAllSubSubCategoryQuery, useGetAllSubCategoryQuery, useGetAllCategoryQuery } = categoryApi;