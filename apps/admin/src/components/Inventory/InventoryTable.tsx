import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '../ui/table';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Edit2, Trash2, Loader2, Package, AlertTriangle, Barcode } from 'lucide-react';

interface InventoryTableProps {
  parts: any[];
  isLoading: boolean;
  onEdit: (part: any) => void;
  onDelete: (id: string) => void;
}

export const InventoryTable = ({ parts, isLoading, onEdit, onDelete }: InventoryTableProps) => {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
  };

  if (isLoading) {
    return (
      <div className="h-64 flex items-center justify-center bg-white rounded-xl border border-gray-100 shadow-sm">
        <Loader2 className="w-8 h-8 animate-spin text-honda-red" />
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden transition-all duration-300">
      <div className="overflow-x-auto">
        <Table>
          <TableHeader className="bg-gray-50/50">
            <TableRow>
              <TableHead className="text-gray-400 font-semibold uppercase text-[11px] tracking-wider px-6">Mã phụ tùng</TableHead>
              <TableHead className="text-gray-400 font-semibold uppercase text-[11px] tracking-wider">Tên phụ tùng</TableHead>
              <TableHead className="text-gray-400 font-semibold uppercase text-[11px] tracking-wider">Dòng xe</TableHead>
              <TableHead className="text-gray-400 font-semibold uppercase text-[11px] tracking-wider">Danh mục</TableHead>
              <TableHead className="text-gray-400 font-semibold uppercase text-[11px] tracking-wider">Số lượng</TableHead>
              <TableHead className="text-gray-400 font-semibold uppercase text-[11px] tracking-wider">Đơn giá</TableHead>
              <TableHead className="text-right text-gray-400 font-semibold uppercase text-[11px] tracking-wider px-6">Thao tác</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {parts && parts.length > 0 ? (
              parts.map((part) => (
                <TableRow key={part.id} className="hover:bg-gray-50/50 transition-colors">
                  <TableCell className="px-6 flex flex-col gap-1">
                    <span className="font-mono text-xs font-bold text-gray-500">{part.partNumber}</span>
                    {part.barcode && (
                      <div className="flex items-center gap-1 text-[9px] text-gray-400">
                        <Barcode size={10} />
                        <span>{part.barcode}</span>
                      </div>
                    )}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-xl bg-gray-50 flex items-center justify-center text-gray-400 shrink-0">
                        <Package size={18} />
                      </div>
                      <div className="flex flex-col">
                        <span className="font-semibold text-gray-900 line-clamp-1">{part.name}</span>
                        <span className="text-[11px] text-gray-400 line-clamp-1">{part.description || 'Không có mô tả'}</span>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-wrap gap-1 max-w-[200px]">
                      {part.vehicles && part.vehicles.length > 0 ? (
                        part.vehicles.slice(0, 3).map((v: any) => (
                          <Badge key={v.id} variant="secondary" className="bg-gray-100 text-gray-600 border-none text-[9px] h-5 px-1.5">
                            {v.modelName}
                          </Badge>
                        ))
                      ) : (
                        <span className="text-[10px] text-gray-400 italic">Chưa gán xe</span>
                      )}
                      {part.vehicles && part.vehicles.length > 3 && (
                        <Badge variant="secondary" className="bg-gray-50 text-gray-400 border-none text-[9px] h-5 px-1.5 italic">
                          +{part.vehicles.length - 3}
                        </Badge>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className="rounded-full bg-blue-50 text-blue-600 border-blue-100 font-medium h-6 text-[10px]">
                      {part.category.name}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <span className={`font-bold ${part.stockQuantity <= part.minStockLevel ? 'text-red-500' : 'text-gray-700'}`}>
                        {part.stockQuantity}
                      </span>
                      {part.stockQuantity <= part.minStockLevel && (
                        <div className="flex items-center gap-1 bg-red-50 text-red-600 px-1.5 py-0.5 rounded text-[10px] font-bold uppercase">
                          <AlertTriangle size={10} />
                          Sắp hết
                        </div>
                      )}
                    </div>
                  </TableCell>
                  <TableCell className="font-semibold text-gray-900">{formatPrice(Number(part.price))}</TableCell>
                  <TableCell className="text-right px-6">
                    <div className="flex justify-end gap-1">
                      <Button variant="ghost" size="icon" onClick={() => onEdit(part)} className="text-blue-600 hover:bg-blue-50 transition-colors">
                        <Edit2 size={16} />
                      </Button>
                      <Button variant="ghost" size="icon" onClick={() => onDelete(part.id)} className="text-red-600 hover:bg-red-50 transition-colors">
                        <Trash2 size={16} />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={6} className="h-64 text-center">
                  <div className="flex flex-col items-center justify-center text-gray-400 gap-2">
                    <Package size={48} className="opacity-20" />
                    <p>Không tìm thấy phụ tùng nào</p>
                  </div>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};
