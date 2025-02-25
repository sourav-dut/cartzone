// services/userApi.js
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const categoryApi = createApi({
  reducerPath: 'categoryApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:1800/api/v1/category',
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
  }),
});

// Auto-generated hooks for the endpoints
export const { useGetAllSubSubCategoryQuery } = categoryApi;