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
    getFiles: builder.query<any[], void>({
      query: () => '/upload',
    }),
    deleteFile: builder.mutation<void, string>({
      query: (url) => ({
        url: '/upload/file',
        method: 'DELETE',
        params: { url },
      }),
    }),
  }),
});

export const { 
  useUploadThumbnailMutation, 
  useGetFilesQuery, 
  useDeleteFileMutation 
} = uploadApiSlice;
