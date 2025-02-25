import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const cartApi = createApi({
    reducerPath: 'cartApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:1800/api/v1/cart',
        prepareHeaders: (headers) => {
            const token = localStorage.getItem('token');
            if (token) {
                headers.set("Authorization", `Bearer ${token}`)
            }
            return headers;
        }
    }),
    endpoints: (builder) => ({
        createCart: builder.mutation({
            query: (productData) => ({
                url: '/create',
                method: 'POST',
                body: productData,
            })
        })
    })
});

export const { useCreateCartMutation } = cartApi;