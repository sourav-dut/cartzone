// services/userApi.js
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const productApi = createApi({
  reducerPath: 'productApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:1800/api/v1/product',
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
    getAllProducts: builder.query({
      query: () => '/get-all',
    }),
    getProductById: builder.query({
      query: (id) => `/${id}`,
    }),
    createProduct: builder.mutation({
      query: (productData) => ({
        url: '/create',
        method: 'POST',
        body: productData,
      })
    }),
    deleteProduct: builder.mutation({
      query: (id) => ({
        url: `/delete/${id}`,
        method: "DELETE"
      })
    }),
    searchProducts: builder.query({
      query: (keyword) => `/search?keyword=${keyword}`,
  }),
  }),
});

// Auto-generated hooks for the endpoints
export const { useGetAllProductsQuery, useGetProductByIdQuery, useCreateProductMutation, useDeleteProductMutation, useSearchProductsQuery } = productApi;