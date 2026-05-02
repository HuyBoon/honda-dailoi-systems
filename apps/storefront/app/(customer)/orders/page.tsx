'use client';

import { useEffect, useState } from 'react';
import { useAuthStore } from '@/store/useAuthStore';
import { getMyOrders } from '@/lib/api';
import { Package, Clock, CheckCircle2, XCircle, Package as PackageIcon, Truck, ChevronRight } from 'lucide-react';
import { format } from 'date-fns';
import Link from 'next/link';
import { toast } from 'react-hot-toast';

export default function OrdersPage() {
  const { token } = useAuthStore();
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 1. Phải tắt loading nếu không có token (đề phòng kẹt)
    if (!token) {
      setLoading(false);
      return;
    }

    const fetchOrders = async () => {
      try {
        const data = await getMyOrders(token);
        
        if (Array.isArray(data)) {
          setOrders(data);
        } else if (data && Array.isArray(data.data)) {
          setOrders(data.data);
        } else {
          setOrders([]);
        }
      } catch (err) {
        toast.error('Không thể tải lịch sử đơn hàng');
        setOrders([]);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [token]);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'PENDING': return <Clock className="text-amber-500" size={16} />;
      case 'COMPLETED': return <CheckCircle2 className="text-green-500" size={16} />;
      case 'CANCELLED': return <XCircle className="text-red-500" size={16} />;
      default: return <Clock className="text-gray-400" size={16} />;
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'PENDING': return 'Đang xử lý';
      case 'COMPLETED': return 'Hoàn thành';
      case 'CANCELLED': return 'Đã hủy';
      default: return status;
    }
  };

  return (
    <div className="animate-in fade-in duration-500">
      <div className="mb-8 border-b border-gray-100 pb-6">
        <h1 className="text-2xl font-black text-gray-900 uppercase tracking-tight mb-1">Lịch sử đơn hàng</h1>
        <p className="text-gray-500 font-medium text-sm">Theo dõi trạng thái các đơn hàng bạn đã đặt.</p>
      </div>

      <div>
        {loading ? (
          <div className="flex justify-center py-20">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#CC0000]"></div>
          </div>
        ) : orders.length === 0 ? (
          <div className="text-center py-20 bg-gray-50/50 rounded-3xl border-2 border-dashed border-gray-200">
            <Package className="mx-auto text-gray-300 mb-4" size={48} />
            <p className="text-gray-500 font-bold uppercase tracking-widest text-sm">Bạn chưa có đơn hàng nào</p>
            <Link href="/parts" className="mt-6 inline-flex items-center gap-2 text-[#CC0000] font-black uppercase tracking-widest text-xs hover:underline">
              Mua sắm ngay <ChevronRight size={14} />
            </Link>
          </div>
        ) : (
          <div className="space-y-5">
            {orders.map((order) => (
              <div key={order.id} className="bg-white border border-gray-100 rounded-3xl overflow-hidden hover:shadow-lg hover:shadow-gray-100/50 transition-all group">
                <div className="p-5 md:p-6 flex flex-col md:flex-row md:items-center justify-between gap-6">
                  <div className="flex items-start gap-4">
                    <div className="w-14 h-14 bg-gray-50 rounded-2xl flex items-center justify-center shrink-0 group-hover:bg-red-50 transition-colors">
                      <PackageIcon className="text-gray-400 group-hover:text-[#CC0000] transition-colors" size={24} />
                    </div>
                    <div>
                      <h3 className="text-base font-black text-gray-900 mb-1">{order.orderNumber}</h3>
                      <p className="text-[11px] text-gray-400 font-bold uppercase tracking-wider mb-2">
                        Ngày đặt: {format(new Date(order.createdAt), 'dd/MM/yyyy')}
                      </p>
                      <div className="flex items-center gap-1.5 px-2.5 py-1 bg-gray-50 rounded-full w-fit">
                        {getStatusIcon(order.status)}
                        <span className="text-[10px] font-black uppercase text-gray-700">{getStatusText(order.status)}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col md:items-end gap-1.5">
                    <p className="text-xl font-black text-[#CC0000]">
                      {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(order.totalAmount)}
                    </p>
                    <div className="flex items-center gap-1.5 text-[10px] font-black text-gray-400 uppercase">
                      <Truck size={12} /> {order.paymentMethod} • {order.paymentStatus === 'PAID' ? 'Đã thanh toán' : 'Chờ thanh toán'}
                    </div>
                  </div>
                </div>

                {/* Items Preview */}
                <div className="bg-gray-50/50 px-6 py-3 border-t border-gray-100 flex items-center justify-between">
                  <div className="flex -space-x-2 overflow-hidden">
                    {order.items.slice(0, 3).map((item: any, idx: number) => (
                      <div key={idx} className="inline-block h-8 w-8 rounded-full ring-2 ring-white bg-gray-200 overflow-hidden shadow-sm">
                        {item.part.imageUrl ? (
                          <img src={item.part.imageUrl} className="h-full w-full object-cover" alt="part" />
                        ) : (
                          <div className="h-full w-full bg-gray-200" />
                        )}
                      </div>
                    ))}
                    {order.items.length > 3 && (
                      <div className="inline-flex h-8 w-8 items-center justify-center rounded-full ring-2 ring-white bg-gray-100 text-[10px] font-bold text-gray-500 shadow-sm">
                        +{order.items.length - 3}
                      </div>
                    )}
                  </div>
                  <Link href={`/orders/${order.id}`} className="text-[10px] font-black text-gray-400 uppercase tracking-widest flex items-center gap-1 group-hover:text-[#CC0000] hover:gap-2 transition-all">
                    Xem chi tiết <ChevronRight size={14} />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}