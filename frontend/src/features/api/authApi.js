import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:1800/api/v1/user', // Replace with your API URL
    // prepareHeaders: (headers, { getState }) => {
    //   const token = getState().auth.token;
    //   if (token) {
    //     headers.set('Authorization', `Bearer ${token}`);
    //   }
    //   return headers;
    // },
  }),
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (loginData) => ({
        url: '/login',
        method: 'POST',
        body: loginData,
      }),
    }),
    register: builder.mutation({
      query: (registerData) => ({
        url: '/register',
        method: 'POST',
        body: registerData,
      }),
    }),
    forgotPassword: builder.mutation({
      query: (email) => ({
        url: "/forgot-password",
        method: "POST",
        body: email,
      }),
    }),
    resetPassword: builder.mutation({
      query: (data) => ({
          url: "/reset-password",
          method: "POST",
          body: data,
      }),
  }),
  }),
});

export const { useLoginMutation, useRegisterMutation, useForgotPasswordMutation, useResetPasswordMutation } = authApi;
