import { Card, CardContent } from '../ui/card';
import { AlertTriangle } from 'lucide-react';

interface LowStockAlertsProps {
  lowStockParts: any[];
}

const API_BASE_URL = 'http://localhost:3000';

export const LowStockAlerts = ({ lowStockParts }: LowStockAlertsProps) => {
  const getImageUrl = (url: string) => {
    if (!url) return '';
    if (url.startsWith('http')) return url;
    return `${API_BASE_URL}${url}`;
  };

  if (!lowStockParts || lowStockParts.length === 0) return null;

  return (
    <div className="mt-8">
      <div className="flex items-center gap-2 mb-4">
        <AlertTriangle className="text-red-600 animate-pulse" size={20} />
        <h2 className="text-lg font-bold text-gray-800 uppercase tracking-tight">Cảnh báo tồn kho thấp</h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {lowStockParts.map((part) => (
          <Card key={part.id} className="border-l-4 border-l-red-600 shadow-sm hover:shadow-md transition-all duration-300">
            <CardContent className="p-4 flex items-center justify-between gap-4">
              <div className="flex items-center gap-3 flex-1 overflow-hidden">
                <div className="w-12 h-12 rounded-lg bg-gray-50 flex items-center justify-center text-gray-300 shrink-0 overflow-hidden border border-gray-100">
                  {part.imageUrl ? (
                    <img src={getImageUrl(part.imageUrl)} alt={part.name} className="w-full h-full object-cover" />
                  ) : (
                    <span className="text-[10px] font-bold">IMG</span>
                  )}
                </div>
                <div className="flex flex-col gap-0.5 overflow-hidden">
                  <span className="text-[9px] font-bold text-red-600 uppercase tracking-widest">{part.category?.name}</span>
                  <span className="text-sm font-bold text-gray-900 line-clamp-1">{part.name}</span>
                  <span className="text-[10px] font-mono text-gray-400">{part.partNumber}</span>
                </div>
              </div>
              <div className="flex flex-col items-end gap-1 shrink-0">
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
  );
};
