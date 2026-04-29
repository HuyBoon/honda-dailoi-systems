import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { AreaChart, Area, ResponsiveContainer, Tooltip as ChartTooltip } from 'recharts';
import { 
  Package, 
  FolderOpen, 
  Car, 
  AlertTriangle, 
  Home, 
  TrendingUp, 
  History, 
  ArrowUpRight, 
  ArrowDownLeft,
  DollarSign
} from 'lucide-react';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "../components/ui/breadcrumb";
import { useGetDashboardStatsQuery } from '../store/api/statsApiSlice';

const areaData = [
  { name: 'Jan', value: 30 },
  { name: 'Feb', value: 45 },
  { name: 'Mar', value: 35 },
  { name: 'Apr', value: 80 },
  { name: 'May', value: 45 },
  { name: 'Jun', value: 60 },
  { name: 'Jul', value: 40 },
];

export const Dashboard = () => {
  const { data: stats, isLoading } = useGetDashboardStatsQuery();

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
  };

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
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        
        {/* Metric 1: Total Value */}
        <Card className="border-none shadow-md shadow-gray-200/50 rounded-2xl bg-white overflow-hidden group hover:shadow-xl transition-all duration-300">
          <CardContent className="p-6 flex justify-between items-start">
            <div>
              <p className="text-[13px] font-bold text-gray-400 uppercase tracking-wider mb-1">Giá trị kho hàng</p>
              <h3 className="text-2xl font-black text-gray-900">{formatPrice(stats?.totalValue || 0)}</h3>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-red-50 flex items-center justify-center text-red-600 group-hover:bg-red-600 group-hover:text-white transition-colors duration-300">
              <DollarSign size={22} />
            </div>
          </CardContent>
        </Card>

        {/* Metric 2: Total Parts */}
        <Card className="border-none shadow-md shadow-gray-200/50 rounded-2xl bg-white overflow-hidden group hover:shadow-xl transition-all duration-300">
          <CardContent className="p-6 flex justify-between items-start">
            <div>
              <p className="text-[13px] font-bold text-gray-400 uppercase tracking-wider mb-1">Tổng số phụ tùng</p>
              <h3 className="text-2xl font-black text-gray-900">{stats?.totalParts || 0} <span className="text-sm font-medium text-gray-400">mã</span></h3>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-blue-50 flex items-center justify-center text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors duration-300">
              <Package size={22} />
            </div>
          </CardContent>
        </Card>

        {/* Metric 3: Low Stock */}
        <Card className="border-none shadow-md shadow-gray-200/50 rounded-2xl bg-white overflow-hidden group hover:shadow-xl transition-all duration-300">
          <CardContent className="p-6 flex justify-between items-start">
            <div>
              <p className="text-[13px] font-bold text-gray-400 uppercase tracking-wider mb-1">Cảnh báo tồn kho</p>
              <h3 className={`text-2xl font-black ${(stats?.lowStockCount || 0) > 0 ? 'text-red-500' : 'text-gray-900'}`}>
                {stats?.lowStockCount || 0} <span className="text-sm font-medium text-gray-400">sắp hết</span>
              </h3>
            </div>
            <div className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-colors duration-300 ${(stats?.lowStockCount || 0) > 0 ? 'bg-red-50 text-red-600 group-hover:bg-red-600 group-hover:text-white' : 'bg-green-50 text-green-600 group-hover:bg-green-600 group-hover:text-white'}`}>
              <AlertTriangle size={22} />
            </div>
          </CardContent>
        </Card>

        {/* Metric 4: Infrastructure */}
        <Card className="border-none shadow-md shadow-gray-200/50 rounded-2xl bg-white overflow-hidden group hover:shadow-xl transition-all duration-300">
          <CardContent className="p-6 flex justify-between items-start">
            <div>
              <p className="text-[13px] font-bold text-gray-400 uppercase tracking-wider mb-1">Danh mục & Dòng xe</p>
              <h3 className="text-2xl font-black text-gray-900">{stats?.totalCategories || 0} / {stats?.totalVehicles || 0}</h3>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-purple-50 flex items-center justify-center text-purple-600 group-hover:bg-purple-600 group-hover:text-white transition-colors duration-300">
              <FolderOpen size={22} />
            </div>
          </CardContent>
        </Card>

      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Recent Transactions List */}
        <Card className="border-none shadow-md shadow-gray-200/50 rounded-2xl col-span-1 lg:max-h-[500px] overflow-hidden flex flex-col">
          <CardHeader className="p-6 flex flex-row items-center justify-between pb-4">
            <CardTitle className="text-lg font-bold text-gray-800 flex items-center gap-2">
              <History size={18} className="text-red-600" />
              Giao dịch gần đây
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0 flex-1 overflow-y-auto custom-scrollbar">
            <div className="px-6 pb-6">
              {stats?.recentTransactions && stats.recentTransactions.length > 0 ? (
                <div className="space-y-4">
                  {stats.recentTransactions.map((tx, idx) => (
                    <div key={idx} className="flex items-center justify-between group">
                      <div className="flex items-center gap-3">
                        <div className={`w-9 h-9 rounded-full flex items-center justify-center shrink-0 ${tx.type === 'IMPORT' ? 'bg-green-50 text-green-600' : 'bg-orange-50 text-orange-600'}`}>
                          {tx.type === 'IMPORT' ? <ArrowDownLeft size={16} /> : <ArrowUpRight size={16} />}
                        </div>
                        <div className="flex flex-col">
                          <span className="text-sm font-bold text-gray-800 line-clamp-1">{tx.part.name}</span>
                          <span className="text-[11px] font-medium text-gray-400 capitalize">{tx.type === 'IMPORT' ? 'Nhập kho' : 'Xuất kho'} • {new Date(tx.createdAt).toLocaleDateString()}</span>
                        </div>
                      </div>
                      <span className={`text-sm font-black ${tx.type === 'IMPORT' ? 'text-green-600' : 'text-orange-600'}`}>
                        {tx.type === 'IMPORT' ? '+' : '-'}{tx.quantity}
                      </span>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="h-48 flex items-center justify-center text-gray-400 text-sm">Chưa có giao dịch nào</div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Total Earning Area Chart */}
        <Card className="border-none shadow-md shadow-gray-200/50 rounded-2xl flex flex-col items-stretch col-span-1 lg:col-span-2">
          <CardHeader className="p-6 flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-lg font-bold text-gray-800 flex items-center gap-2">
               <TrendingUp size={18} className="text-red-600" />
               Biểu đồ biến động kho
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0 flex-1 flex flex-col justify-between">
            <div className="px-6 mb-2 flex items-baseline gap-2">
              <span className="text-4xl font-black text-gray-900">+24%</span>
              <span className="text-sm font-bold text-green-500 flex items-center gap-1">Tuần này</span>
            </div>
            
            <div className="w-full h-[280px] mt-4">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={areaData} margin={{ top: 10, right: 10, left: 10, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#cc0000" stopOpacity={0.2}/>
                      <stop offset="95%" stopColor="#cc0000" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <ChartTooltip 
                    contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                  />
                  <Area type="monotone" dataKey="value" stroke="#cc0000" strokeWidth={4} fillOpacity={1} fill="url(#colorValue)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>

            <div className="p-6 border-t border-gray-50 flex items-center justify-between">
               <div className="flex items-center gap-3">
                 <div className="w-10 h-10 rounded-xl bg-red-600 flex items-center justify-center text-white shadow-lg shadow-red-600/20"><Car size={20}/></div>
                 <div className="flex flex-col">
                   <span className="text-sm font-bold text-gray-800">Dòng xe hot nhất</span>
                   <span className="text-[12px] text-gray-500">Air Blade 2023 (125cc)</span>
                 </div>
               </div>
               <Button variant="ghost" className="text-red-600 font-bold hover:bg-red-50 rounded-lg">Xem chi tiết</Button>
            </div>
          </CardContent>
        </Card>

      </div>

      {/* Low Stock Alerts Section */}
      {(stats?.lowStockParts && stats.lowStockParts.length > 0) && (
        <div className="mt-8">
          <div className="flex items-center gap-2 mb-4">
            <AlertTriangle className="text-red-600 animate-pulse" size={20} />
            <h2 className="text-lg font-bold text-gray-800 uppercase tracking-tight">Cảnh báo tồn kho thấp</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {stats.lowStockParts.map((part: any) => (
              <Card key={part.id} className="border-l-4 border-l-red-600 shadow-sm hover:shadow-md transition-all duration-300">
                <CardContent className="p-4 flex justify-between items-center">
                  <div className="flex flex-col gap-1">
                    <span className="text-[10px] font-bold text-red-600 uppercase tracking-widest">{part.category.name}</span>
                    <span className="text-sm font-bold text-gray-900 line-clamp-1">{part.name}</span>
                    <span className="text-[11px] font-mono text-gray-400">{part.partNumber}</span>
                  </div>
                  <div className="flex flex-col items-end gap-1">
                    <div className="flex items-center gap-1.5 text-red-600 bg-red-50 px-2 py-1 rounded-lg">
                       <span className="text-lg font-black">{part.stockQuantity}</span>
                       <span className="text-[10px] font-bold uppercase">Còn lại</span>
                    </div>
                    <span className="text-[10px] text-gray-400 font-medium">Tối thiểu: {part.minStockLevel}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
