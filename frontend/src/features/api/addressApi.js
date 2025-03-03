import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const addressApi = createApi({
    reducerPath: 'addressApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:1800/api/v1/address',
        prepareHeaders: (headers) => {
            const token = localStorage.getItem('token');
            if (token) {
                headers.set("Authorization", `Bearer ${token}`)
            }
            return headers;
        }
    }),
    endpoints: (builder) => ({
        createAddress: builder.mutation({
            query: (newAddress) => ({
                url: '/create',
                method: 'POST',
                body: newAddress,
            })
        }),
        getAddress: builder.query({
            query: (id) => `/get/user/${id}`
        }),
        deleteAddress: builder.mutation({
            query: (id) => ({
                url: `/delete/user/${id}`,
                method: "DELETE"
            }),
        }),
    })
});

export const {useCreateAddressMutation, useGetAddressQuery, useDeleteAddressMutation} = addressApi;