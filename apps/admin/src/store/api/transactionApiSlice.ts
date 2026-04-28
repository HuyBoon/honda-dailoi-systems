import { apiSlice } from './apiSlice';

export type TransactionType = 'IMPORT' | 'EXPORT';

export const TransactionType = {
  IMPORT: 'IMPORT' as TransactionType,
  EXPORT: 'EXPORT' as TransactionType,
};

export interface Transaction {
  id: string;
  type: TransactionType;
  quantity: number;
  notes?: string;
  partId: string;
  part: {
    name: string;
    partNumber: string;
  };
  createdAt: string;
}

export const transactionApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getTransactions: builder.query<Transaction[], void>({
      query: () => '/transactions',
      providesTags: ['Inventory'], // Reuse inventory tag or add 'Transaction'
    }),
    createTransaction: builder.mutation<Transaction, { partId: string; type: TransactionType; quantity: number; notes? : string }>({
      query: (body) => ({
        url: '/transactions',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Inventory', 'Part'], // Invalidate parts so stock reflects accurately
    }),
  }),
});

export const {
  useGetTransactionsQuery,
  useCreateTransactionMutation,
} = transactionApiSlice;
