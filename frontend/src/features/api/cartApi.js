import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const cartApi = createApi({
    reducerPath: 'cartApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://cartzone-jobq.onrender.com/api/v1/cart',
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
        }),
        getCart: builder.query({
            query: (id) => `/user/${id}`
        }),
        deleteCart: builder.mutation({
            query: (id) => ({
                url: `/cart/${id}`,
                method: "DELETE"
            }),
            invalidatesTags: ["Cart"], // Ensures UI updates after deletion
        }),
        deleteCartByUserId: builder.mutation({
            query: (id) => ({
                url: `/user/${id}`,
                method: "DELETE"
            }),
            invalidatesTags: ["Cart"], // Ensures UI updates after deletion
        }),
    })
});

export const { useCreateCartMutation, useGetCartQuery, useDeleteCartMutation, useDeleteCartByUserIdMutation } = cartApi;