import { apiSlice } from './apiSlice';

export const uploadApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    uploadThumbnail: builder.mutation<{ url: string }, File>({
      query: (file) => {
        const formData = new FormData();
        formData.append('file', file);
        return {
          url: '/upload/thumbnail',
          method: 'POST',
          body: formData,
        };
      },
    }),
  }),
});

export const { useUploadThumbnailMutation } = uploadApiSlice;
