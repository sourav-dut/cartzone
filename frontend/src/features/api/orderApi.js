import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const orderApi = createApi({
    reducerPath: 'orderApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:1800/api/v1/order',
        prepareHeaders: (headers) => {
            const token = localStorage.getItem('token');
            if (token) {
                headers.set("Authorization", `Bearer ${token}`)
            }
            return headers;
        }
    }),
    endpoints: (builder) => ({
        createOrder: builder.mutation({
            query: (orderData) => ({
                url: '/create',
                method: 'POST',
                body: orderData,
            })
        }),
        getOrder: builder.query({
            query: () => '/'
        }),
        getOrderByUserId: builder.query({
            query: (id) => `/user/${id}`
        }),
        updateOrder: builder.mutation({
            query: (orderId, updateStatus) => ({
                url: `/update`,
                method: "PATCH",
                body: orderId, updateStatus
            }),
            // invalidatesTags: ["Cart"], // Ensures UI updates after deletion
        }),
        cancelOrder: builder.mutation({
            query: (orderId) => ({
                url: `/delete/${orderId}`,
                method: "DELETE",
            }),
            // invalidatesTags: ["Cart"], // Ensures UI updates after deletion
        }),
    })
});

export const { useCreateOrderMutation, useGetOrderQuery, useGetOrderByUserIdQuery, useUpdateOrderMutation, useCancelOrderMutation } = orderApi;