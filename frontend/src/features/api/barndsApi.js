import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const brandApi = createApi({
  reducerPath: 'brandApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:1800/api/v1/brand', // Replace with your API URL
    // prepareHeaders: (headers, { getState }) => {
    //   const token = getState().auth.token;
    //   if (token) {
    //     headers.set('Authorization', `Bearer ${token}`);
    //   }
    //   return headers;
    // },
  }),
  endpoints: (builder) => ({
    getAllBrand: builder.query({
        query: () => "/get"
    })
  })
});

export const { useGetAllBrandQuery } = brandApi;
