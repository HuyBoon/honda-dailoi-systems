import { Card, CardContent } from '../ui/card';
import { Package, FolderOpen, AlertTriangle, DollarSign } from 'lucide-react';

interface StatsCardsProps {
  stats: any;
}

export const StatsCards = ({ stats }: StatsCardsProps) => {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
  };

  const metrics = [
    {
      title: 'Giá trị kho hàng',
      value: formatPrice(stats?.totalValue || 0),
      icon: <DollarSign size={22} />,
      color: 'bg-red-50 text-red-600 group-hover:bg-red-600',
      label: ''
    },
    {
      title: 'Tổng số phụ tùng',
      value: `${stats?.totalParts || 0}`,
      unit: 'mã',
      icon: <Package size={22} />,
      color: 'bg-blue-50 text-blue-600 group-hover:bg-blue-600',
      label: ''
    },
    {
      title: 'Cảnh báo tồn kho',
      value: `${stats?.lowStockCount || 0}`,
      unit: 'sắp hết',
      icon: <AlertTriangle size={22} />,
      color: (stats?.lowStockCount || 0) > 0 
        ? 'bg-red-50 text-red-600 group-hover:bg-red-600' 
        : 'bg-green-50 text-green-600 group-hover:bg-green-600',
      isCritical: (stats?.lowStockCount || 0) > 0
    },
    {
      title: 'Danh mục & Dòng xe',
      value: `${stats?.totalCategories || 0} / ${stats?.totalVehicles || 0}`,
      icon: <FolderOpen size={22} />,
      color: 'bg-purple-50 text-purple-600 group-hover:bg-purple-600',
      label: ''
    }
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {metrics.map((m, idx) => (
        <Card key={idx} className="border-none shadow-md shadow-gray-200/50 rounded-2xl bg-white overflow-hidden group hover:shadow-xl transition-all duration-300">
          <CardContent className="p-6 flex justify-between items-start">
            <div>
              <p className="text-[13px] font-bold text-gray-400 uppercase tracking-wider mb-1">{m.title}</p>
              <h3 className={`text-2xl font-black ${m.isCritical ? 'text-red-500' : 'text-gray-900'}`}>
                {m.value} {m.unit && <span className="text-sm font-medium text-gray-400">{m.unit}</span>}
              </h3>
            </div>
            <div className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-colors duration-300 group-hover:text-white ${m.color}`}>
              {m.icon}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};
