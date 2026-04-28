import { apiSlice } from './apiSlice';

export interface DashboardStats {
  totalParts: number;
  totalCategories: number;
  totalVehicles: number;
  lowStockCount: number;
  totalValue: number;
  recentTransactions: any[];
}

export const statsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getDashboardStats: builder.query<DashboardStats, void>({
      query: () => '/stats/dashboard',
      providesTags: ['Dashboard', 'Inventory', 'Part'],
    }),
  }),
});

export const { useGetDashboardStatsQuery } = statsApiSlice;
