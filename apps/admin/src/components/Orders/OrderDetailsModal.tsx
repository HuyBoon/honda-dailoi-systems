import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogFooter 
} from '../ui/dialog';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { type Order, OrderStatus } from '@/store/api/orderApiSlice';
import { 
  CheckCircle2, XCircle, Clock, 
  User, Phone, MapPin, Calendar, 
  Hash, CreditCard, FileText, Package
} from 'lucide-react';
import { format } from 'date-fns';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '../ui/table';

interface OrderDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  order: Order | null;
  onUpdateStatus?: (id: string, status: OrderStatus) => void;
}

export const OrderDetailsModal = ({ isOpen, onClose, order, onUpdateStatus }: OrderDetailsModalProps) => {
  if (!order) return null;

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);
  };

  const getStatusBadge = (status: OrderStatus) => {
    switch (status) {
      case OrderStatus.COMPLETED:
        return <Badge className="bg-green-100 text-green-700 border-green-200"><CheckCircle2 size={12} className="mr-1" /> Đã hoàn thành</Badge>;
      case OrderStatus.CANCELLED:
        return <Badge className="bg-red-100 text-red-700 border-red-200"><XCircle size={12} className="mr-1" /> Đã hủy</Badge>;
      default:
        return <Badge className="bg-amber-100 text-amber-700 border-amber-200"><Clock size={12} className="mr-1" /> Đang chờ xử lý</Badge>;
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[700px] rounded-2xl bg-white p-0 overflow-hidden border-none shadow-2xl flex flex-col max-h-[90vh]">
        <DialogHeader className="p-6 pb-2 shrink-0 border-b border-gray-50">
          <div className="flex justify-between items-start">
            <div>
              <DialogTitle className="text-2xl font-black text-gray-900 flex items-center gap-2">
                Chi tiết đơn hàng
                <span className="text-gray-400 font-mono text-sm">#{order.orderNumber}</span>
              </DialogTitle>
              <div className="flex gap-4 mt-2">
                <span className="text-xs text-gray-400 flex items-center gap-1">
                  <Calendar size={12} /> {format(new Date(order.createdAt), 'dd/MM/yyyy HH:mm')}
                </span>
                <span className="text-xs text-gray-400 flex items-center gap-1">
                  <User size={12} /> {order.staff ? `Nhân viên: ${order.staff.email}` : 'Đặt hàng trực tuyến'}
                </span>
              </div>
            </div>
            {getStatusBadge(order.status)}
          </div>
        </DialogHeader>

        <div className="p-6 space-y-8 overflow-y-auto custom-scrollbar flex-1">
          {/* Customer Info */}
          <div className="bg-gray-50 rounded-2xl p-4 grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <h4 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest flex items-center gap-1">
                <User size={10} /> Khách hàng
              </h4>
              <p className="font-bold text-gray-900">{order.customer?.name || 'Khách vãng lai'}</p>
            </div>
            <div className="space-y-2">
              <h4 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest flex items-center gap-1">
                <Phone size={10} /> Số điện thoại
              </h4>
              <p className="font-bold text-gray-900">{order.customer?.phone || 'N/A'}</p>
            </div>
            {order.customer?.address && (
              <div className="col-span-2 space-y-2 pt-2 border-t border-gray-200/50">
                <h4 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest flex items-center gap-1">
                  <MapPin size={10} /> Địa chỉ
                </h4>
                <p className="text-sm text-gray-600">{order.customer.address}</p>
              </div>
            )}
          </div>

          {/* Items Table */}
          <div className="space-y-3">
            <h4 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest flex items-center gap-1">
              <Package size={10} /> Danh sách sản phẩm
            </h4>
            <div className="border border-gray-100 rounded-xl overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow className="bg-gray-50 hover:bg-gray-50">
                    <TableHead className="text-[11px] font-bold">Phụ tùng</TableHead>
                    <TableHead className="text-[11px] font-bold text-center">SL</TableHead>
                    <TableHead className="text-[11px] font-bold text-right">Đơn giá</TableHead>
                    <TableHead className="text-[11px] font-bold text-right">Thành tiền</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {order.items.map((item) => (
                    <TableRow key={item.id} className="text-sm">
                      <TableCell>
                        <div className="flex flex-col">
                          <span className="font-bold text-gray-900">{item.part.name}</span>
                          <span className="text-[10px] text-gray-400 font-mono">{item.part.partNumber}</span>
                        </div>
                      </TableCell>
                      <TableCell className="text-center font-medium">{item.quantity}</TableCell>
                      <TableCell className="text-right text-gray-600">{formatCurrency(item.price)}</TableCell>
                      <TableCell className="text-right font-bold text-gray-900">
                        {formatCurrency(item.price * item.quantity)}
                      </TableCell>
                    </TableRow>
                  ))}
                  <TableRow className="bg-red-50/50">
                    <TableCell colSpan={3} className="text-right font-bold text-gray-900 uppercase tracking-widest text-[11px]">Tổng cộng</TableCell>
                    <TableCell className="text-right font-black text-lg text-honda-red">
                      {formatCurrency(order.totalAmount)}
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>
          </div>

          {order.notes && (
            <div className="space-y-2">
              <h4 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest flex items-center gap-1">
                <FileText size={10} /> Ghi chú
              </h4>
              <p className="text-sm text-gray-600 bg-amber-50/50 p-3 rounded-xl border border-amber-100">
                {order.notes}
              </p>
            </div>
          )}
        </div>

        <DialogFooter className="p-6 bg-gray-50/50 border-t border-gray-100 flex flex-row gap-3 shrink-0">
          <Button variant="ghost" onClick={onClose} className="flex-1 rounded-xl text-gray-600 h-12 font-semibold">
            Đóng
          </Button>
          {order.status === OrderStatus.PENDING && onUpdateStatus && (
            <>
              <Button 
                onClick={() => onUpdateStatus(order.id, OrderStatus.CANCELLED)}
                variant="outline" 
                className="flex-1 rounded-xl border-red-200 text-red-600 hover:bg-red-50 h-12 font-bold"
              >
                Hủy đơn
              </Button>
              <Button 
                onClick={() => onUpdateStatus(order.id, OrderStatus.COMPLETED)}
                className="flex-1 bg-green-600 hover:bg-green-700 text-white rounded-xl shadow-lg h-12 font-bold"
              >
                Hoàn thành
              </Button>
            </>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
