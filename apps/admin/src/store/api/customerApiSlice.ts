import { apiSlice } from './apiSlice';

export interface Customer {
  id: string;
  name: string;
  phone: string;
  address?: string;
  createdAt: string;
  updatedAt: string;
  user?: {
    email: string;
    role: string;
  };
}

export const customerApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getCustomers: builder.query<{ items: Customer[]; total: number; page: number; totalPages: number }, { page?: number; limit?: number } | void>({
      query: (params) => ({
        url: '/customers',
        params: params || undefined,
      }),
      providesTags: (result) =>
        result
          ? [
              ...result.items.map(({ id }) => ({ type: 'Customer' as const, id })),
              { type: 'Customer', id: 'LIST' },
            ]
          : [{ type: 'Customer', id: 'LIST' }],
    }),
    deleteCustomer: builder.mutation<void, string>({
      query: (id) => ({
        url: `/customers/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: [{ type: 'Customer', id: 'LIST' }],
    }),
  }),
});

export const {
  useGetCustomersQuery,
  useDeleteCustomerMutation,
} = customerApiSlice;
