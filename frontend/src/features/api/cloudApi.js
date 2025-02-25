import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const cloudApi = createApi({
  reducerPath: "cloudApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:1800/api/" }),
  endpoints: (builder) => ({
    uploadImages: builder.mutation({
      query: (formData) => ({
        url: "/upload",
        method: "POST",
        body: formData,
      }),
    }),
  }),
});

export const { useUploadImagesMutation } = cloudApi;

