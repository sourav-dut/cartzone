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
      query: (params) => ({
        url: '/get-all',
        params: params
      })
    }),
    searchSuggestion: builder.query({
      query: (params) => ({
        url: '/search',
        params: params
      })
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
  }),
});

// Auto-generated hooks for the endpoints
export const { useGetAllProductsQuery, useSearchSuggestionQuery,  useGetProductByIdQuery, useCreateProductMutation, useDeleteProductMutation } = productApi;