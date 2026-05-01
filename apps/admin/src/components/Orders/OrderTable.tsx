import { 
  Eye, CheckCircle2, XCircle, Clock, 
  ChevronRight, User, Phone, MapPin 
} from 'lucide-react';
import { type Order, OrderStatus } from '@/store/api/orderApiSlice';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { format } from 'date-fns';

interface OrderTableProps {
  orders: Order[];
  onView: (order: Order) => void;
  onUpdateStatus: (id: string, status: OrderStatus) => void;
}

export const OrderTable = ({ orders, onView, onUpdateStatus }: OrderTableProps) => {
  const getStatusBadge = (status: OrderStatus) => {
    switch (status) {
      case OrderStatus.COMPLETED:
        return <Badge className="bg-green-100 text-green-700 border-green-200 flex gap-1 items-center px-2 py-0.5"><CheckCircle2 size={12} /> Đã xong</Badge>;
      case OrderStatus.CANCELLED:
        return <Badge className="bg-red-100 text-red-700 border-red-200 flex gap-1 items-center px-2 py-0.5"><XCircle size={12} /> Đã hủy</Badge>;
      default:
        return <Badge className="bg-amber-100 text-amber-700 border-amber-200 flex gap-1 items-center px-2 py-0.5"><Clock size={12} /> Chờ xử lý</Badge>;
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);
  };

  return (
    <Table>
      <TableHeader>
        <TableRow className="bg-gray-50 hover:bg-gray-50 border-b border-gray-100">
          <TableHead className="w-[150px] font-bold text-gray-600">Mã đơn hàng</TableHead>
          <TableHead className="font-bold text-gray-600">Khách hàng</TableHead>
          <TableHead className="font-bold text-gray-600">Ngày tạo</TableHead>
          <TableHead className="font-bold text-gray-600">Tổng tiền</TableHead>
          <TableHead className="font-bold text-gray-600">Trạng thái</TableHead>
          <TableHead className="text-right font-bold text-gray-600">Thao tác</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {orders.length === 0 ? (
          <TableRow>
            <TableCell colSpan={6} className="h-48 text-center text-gray-400">
              Chưa có đơn hàng nào
            </TableCell>
          </TableRow>
        ) : (
          orders.map((order) => (
            <TableRow key={order.id} className="group hover:bg-red-50/30 transition-colors border-b border-gray-50">
              <TableCell className="font-mono font-bold text-gray-900">{order.orderNumber}</TableCell>
              <TableCell>
                <div className="flex flex-col">
                  <span className="font-bold text-gray-900">{order.customer?.name || 'Khách vãng lai'}</span>
                  {order.customer?.phone && (
                    <span className="text-[10px] text-gray-400 flex items-center gap-1">
                      <Phone size={10} /> {order.customer.phone}
                    </span>
                  )}
                </div>
              </TableCell>
              <TableCell className="text-gray-500 text-sm">
                {format(new Date(order.createdAt), 'dd/MM/yyyy HH:mm')}
              </TableCell>
              <TableCell className="font-bold text-honda-red">
                {formatCurrency(order.totalAmount)}
              </TableCell>
              <TableCell>{getStatusBadge(order.status)}</TableCell>
              <TableCell className="text-right">
                <div className="flex justify-end gap-2">
                  <Button 
                    variant="ghost" 
                    size="icon"
                    onClick={() => onView(order)}
                    className="h-8 w-8 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-full"
                  >
                    <Eye size={16} />
                  </Button>
                  {order.status === OrderStatus.PENDING && (
                    <>
                      <Button 
                        variant="ghost" 
                        size="icon"
                        onClick={() => onUpdateStatus(order.id, OrderStatus.COMPLETED)}
                        className="h-8 w-8 text-gray-400 hover:text-green-600 hover:bg-green-50 rounded-full"
                        title="Hoàn thành đơn hàng"
                      >
                        <CheckCircle2 size={16} />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="icon"
                        onClick={() => onUpdateStatus(order.id, OrderStatus.CANCELLED)}
                        className="h-8 w-8 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-full"
                        title="Hủy đơn hàng"
                      >
                        <XCircle size={16} />
                      </Button>
                    </>
                  )}
                </div>
              </TableCell>
            </TableRow>
          ))
        )}
      </TableBody>
    </Table>
  );
};
