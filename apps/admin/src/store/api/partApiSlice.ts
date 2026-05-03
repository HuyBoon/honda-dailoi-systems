import { apiSlice } from './apiSlice';
import type { Category } from './categoryApiSlice';
import type { Vehicle } from './vehicleApiSlice';

export interface Part {
  id: string;
  partNumber: string;
  name: string;
  description?: string;
  imageUrl?: string;
  price: number;
  stockQuantity: number;
  minStockLevel: number;
  barcode?: string;
  categoryId: string;
  category: Category;
  vehicles?: Vehicle[];
  vehicleIds?: string[];
  createdAt: string;
  updatedAt: string;
}

export const partApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getParts: builder.query<{
      filter(arg0: (p: any) => boolean): any; items: Part[]; total: number; page: number; totalPages: number 
}, { categoryId?: string; q?: string; page?: number; limit?: number }>({
      query: (params) => ({
        url: '/parts',
        params,
      }),
      providesTags: (result) =>
        result
          ? [
              ...result.items.map(({ id }) => ({ type: 'Part' as const, id })),
              { type: 'Part', id: 'LIST' },
            ]
          : [{ type: 'Part', id: 'LIST' }],
    }),
    getPart: builder.query<Part, string>({
      query: (id) => `/parts/${id}`,
      providesTags: (_, __, id) => [{ type: 'Part', id }],
    }),
    createPart: builder.mutation<Part, Partial<Part>>({
      query: (body) => ({
        url: '/parts',
        method: 'POST',
        body,
      }),
      invalidatesTags: [{ type: 'Part', id: 'LIST' }],
    }),
    updatePart: builder.mutation<Part, { id: string; body: Partial<Part> }>({
      query: ({ id, body }) => ({
        url: `/parts/${id}`,
        method: 'PATCH',
        body,
      }),
      invalidatesTags: (_, __, { id }) => [{ type: 'Part', id }],
    }),
    deletePart: builder.mutation<void, string>({
      query: (id) => ({
        url: `/parts/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: [{ type: 'Part', id: 'LIST' }],
    }),
  }),
});

export const {
  useGetPartsQuery,
  useGetPartQuery,
  useCreatePartMutation,
  useUpdatePartMutation,
  useDeletePartMutation,
} = partApiSlice;
