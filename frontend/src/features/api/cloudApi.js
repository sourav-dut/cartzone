import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const cloudApi = createApi({
  reducerPath: "cloudApi",
  baseQuery: fetchBaseQuery({ baseUrl: "https://cartzone-jobq.onrender.com/api/" }),
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

