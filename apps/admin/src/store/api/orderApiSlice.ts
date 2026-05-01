import { apiSlice } from './apiSlice';
import type { Part } from './partApiSlice';

export type OrderStatus = 'PENDING' | 'COMPLETED' | 'CANCELLED';

export const OrderStatus = {
  PENDING: 'PENDING',
  COMPLETED: 'COMPLETED',
  CANCELLED: 'CANCELLED',
} as const;

export interface OrderItem {
  id: string;
  quantity: number;
  price: number;
  partId: string;
  part: Part;
}

export interface Customer {
  id: string;
  name: string;
  phone: string;
  address?: string;
}

export interface Order {
  id: string;
  orderNumber: string;
  status: OrderStatus;
  totalAmount: number;
  notes?: string;
  customerId?: string;
  customer?: Customer;
  staffId: string;
  staff: {
    id: string;
    email: string;
  };
  items: OrderItem[];
  createdAt: string;
  updatedAt: string;
}

export const orderApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getOrders: builder.query<Order[], void>({
      query: () => '/orders',
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: 'Order' as const, id })),
              { type: 'Order', id: 'LIST' },
            ]
          : [{ type: 'Order', id: 'LIST' }],
    }),
    getOrder: builder.query<Order, string>({
      query: (id) => `/orders/${id}`,
      providesTags: (_, __, id) => [{ type: 'Order', id }],
    }),
    createOrder: builder.mutation<Order, any>({
      query: (body) => ({
        url: '/orders',
        method: 'POST',
        body,
      }),
      invalidatesTags: [{ type: 'Order', id: 'LIST' }, { type: 'Part', id: 'LIST' }, { type: 'Dashboard', id: 'DASHBOARD' }],
    }),
    updateOrderStatus: builder.mutation<Order, { id: string; status: OrderStatus }>({
      query: ({ id, status }) => ({
        url: `/orders/${id}`,
        method: 'PATCH',
        body: { status },
      }),
      invalidatesTags: (_, __, { id }) => [
        { type: 'Order', id }, 
        { type: 'Order', id: 'LIST' }, 
        { type: 'Part', id: 'LIST' },
        { type: 'Dashboard', id: 'DASHBOARD' }
      ],
    }),
  }),
});

export const {
  useGetOrdersQuery,
  useGetOrderQuery,
  useCreateOrderMutation,
  useUpdateOrderStatusMutation,
} = orderApiSlice;
