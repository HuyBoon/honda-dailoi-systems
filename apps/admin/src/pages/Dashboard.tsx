import { Home } from 'lucide-react';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "../components/ui/breadcrumb";
import { useGetDashboardStatsQuery } from '../store/api/statsApiSlice';
import { StatsCards } from '../components/Dashboard/StatsCards';
import { RecentTransactions } from '../components/Dashboard/RecentTransactions';
import { InventoryChart } from '../components/Dashboard/InventoryChart';
import { LowStockAlerts } from '../components/Dashboard/LowStockAlerts';

export const Dashboard = () => {
  const { data: stats, isLoading } = useGetDashboardStatsQuery();

  if (isLoading) {
    return (
      <div className="p-8 flex items-center justify-center min-h-[60vh]">
        <div className="w-12 h-12 border-4 border-red-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="p-6 md:p-8 max-w-[1600px] mx-auto w-full">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
        <div className="flex items-center gap-4">
          <span className="text-gray-900 font-bold text-2xl">Bảng thống kê</span>
          <div className="h-6 w-px bg-gray-200 hidden sm:block"></div>
          <Breadcrumb className="hidden sm:flex">
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/" className="flex items-center gap-1.5"><Home size={14} /> Trang chủ</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>Thống kê chung</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </div>

      {/* Top 4 Metrics Cards */}
      <StatsCards stats={stats} />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Transactions List */}
        <RecentTransactions transactions={stats?.recentTransactions || []} />

        {/* Total Earning Area Chart */}
        <InventoryChart />
      </div>

      {/* Low Stock Alerts Section */}
      <LowStockAlerts lowStockParts={stats?.lowStockParts || []} />
    </div>
  );
};
