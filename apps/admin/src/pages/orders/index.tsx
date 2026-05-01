import { useState } from 'react';
import { 
  useGetOrdersQuery, 
  useCreateOrderMutation, 
  useUpdateOrderStatusMutation,
  OrderStatus,
  type Order
} from '@/store/api/orderApiSlice';
import { PageHeader } from '@/components/PageHeader';
import { OrderTable } from '@/components/Orders/OrderTable';
import { CreateOrderModal } from '@/components/Orders/CreateOrderModal';
import { OrderDetailsModal } from '@/components/Orders/OrderDetailsModal';
import { toast } from 'react-hot-toast';
import { Loader2, ShoppingCart } from 'lucide-react';

export const Orders = () => {
  const { data: orders, isLoading, refetch } = useGetOrdersQuery();
  const [createOrder, { isLoading: isCreating }] = useCreateOrderMutation();
  const [updateStatus] = useUpdateOrderStatusMutation();

  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  const handleCreateOrder = async (data: any) => {
    try {
      await createOrder(data).unwrap();
      toast.success('Tạo đơn hàng thành công');
      setIsCreateModalOpen(false);
    } catch (err: any) {
      toast.error(err.data?.message || 'Không thể tạo đơn hàng');
    }
  };

  const handleUpdateStatus = async (id: string, status: OrderStatus) => {
    const confirmMessage = status === OrderStatus.COMPLETED 
      ? 'Xác nhận hoàn thành đơn hàng? Hành động này sẽ trừ số lượng tồn kho.'
      : 'Bạn có chắc chắn muốn hủy đơn hàng này?';

    if (!window.confirm(confirmMessage)) return;

    try {
      await updateStatus({ id, status }).unwrap();
      toast.success('Cập nhật trạng thái thành công');
      if (isDetailsModalOpen) setIsDetailsModalOpen(false);
    } catch (err) {
      toast.error('Không thể cập nhật trạng thái');
    }
  };

  const handleViewOrder = (order: Order) => {
    setSelectedOrder(order);
    setIsDetailsModalOpen(true);
  };

  return (
    <div className="space-y-6">
      <PageHeader 
        title="Quản lý đơn hàng"
        subtitle="Theo dõi và quản lý các giao dịch bán hàng"
        actionButtonText="Tạo đơn hàng"
        onActionClick={() => setIsCreateModalOpen(true)}
      />

      <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
        {isLoading ? (
          <div className="h-64 flex items-center justify-center">
            <Loader2 className="w-8 h-8 animate-spin text-honda-red" />
          </div>
        ) : (
          <OrderTable 
            orders={orders || []} 
            onView={handleViewOrder}
            onUpdateStatus={handleUpdateStatus}
          />
        )}
      </div>

      <CreateOrderModal 
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onSubmit={handleCreateOrder}
        isLoading={isCreating}
      />

      <OrderDetailsModal 
        isOpen={isDetailsModalOpen}
        onClose={() => setIsDetailsModalOpen(false)}
        order={selectedOrder}
        onUpdateStatus={handleUpdateStatus}
      />
    </div>
  );
};
