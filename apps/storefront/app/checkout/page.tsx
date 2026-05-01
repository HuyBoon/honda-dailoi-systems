'use client';

import { useState } from 'react';
import { useCartStore } from '@/store/useCartStore';
import { createOrder } from '@/lib/api';
import { 
  ShieldCheck, ArrowLeft, CreditCard, 
  Truck, CheckCircle2, AlertCircle,
  Loader2 
} from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function CheckoutPage() {
  const router = useRouter();
  const { items, clearCart } = useCartStore();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    customerName: '',
    customerPhone: '',
    address: '',
    note: ''
  });

  const subtotal = items.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const shipping = 30000; // Flat fee for demo
  const total = subtotal + shipping;

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      const orderData = {
        customerName: formData.customerName,
        customerPhone: formData.customerPhone,
        address: formData.address,
        items: items.map(item => ({
          partId: item.id,
          quantity: item.quantity,
          price: Number(item.price)
        }))
      };

      await createOrder(orderData);
      clearCart();
      router.push('/checkout/success');
    } catch (err: any) {
      setError(err.message || 'Có lỗi xảy ra khi đặt hàng. Vui lòng thử lại.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-32 text-center space-y-6">
        <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto text-gray-300">
          <Truck size={40} />
        </div>
        <h2 className="text-2xl font-black text-gray-900 uppercase">Giỏ hàng của bạn đang trống</h2>
        <p className="text-gray-500">Hãy thêm sản phẩm vào giỏ hàng trước khi thanh toán.</p>
        <Link href="/parts" className="honda-btn inline-flex">Quay lại mua sắm</Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 lg:px-8 py-12">
      <Link href="/parts" className="inline-flex items-center gap-2 text-sm font-bold text-gray-400 hover:text-[#CC0000] transition-colors mb-12 uppercase tracking-widest">
        <ArrowLeft size={16} /> Quay lại mua sắm
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
        {/* Left: Checkout Form */}
        <div className="lg:col-span-7 space-y-10">
          <div>
            <h1 className="text-4xl font-black text-gray-900 tracking-tighter uppercase mb-2">Thanh toán</h1>
            <p className="text-gray-500 font-medium">Vui lòng điền thông tin để chúng tôi có thể giao hàng nhanh nhất.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-xs font-black uppercase tracking-widest text-gray-400">Họ và tên</label>
                <input 
                  required
                  type="text"
                  placeholder="Nguyễn Văn A"
                  className="w-full px-6 py-4 bg-white border border-gray-100 rounded-2xl focus:ring-2 focus:ring-[#CC0000]/20 outline-none transition-all"
                  value={formData.customerName}
                  onChange={(e) => setFormData({...formData, customerName: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-black uppercase tracking-widest text-gray-400">Số điện thoại</label>
                <input 
                  required
                  type="tel"
                  placeholder="090 123 4567"
                  className="w-full px-6 py-4 bg-white border border-gray-100 rounded-2xl focus:ring-2 focus:ring-[#CC0000]/20 outline-none transition-all"
                  value={formData.customerPhone}
                  onChange={(e) => setFormData({...formData, customerPhone: e.target.value})}
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-black uppercase tracking-widest text-gray-400">Địa chỉ giao hàng</label>
              <input 
                required
                type="text"
                placeholder="Số nhà, tên đường, phường/xã, quận/huyện, tỉnh/thành phố"
                className="w-full px-6 py-4 bg-white border border-gray-100 rounded-2xl focus:ring-2 focus:ring-[#CC0000]/20 outline-none transition-all"
                value={formData.address}
                onChange={(e) => setFormData({...formData, address: e.target.value})}
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-black uppercase tracking-widest text-gray-400">Ghi chú (Tùy chọn)</label>
              <textarea 
                rows={3}
                placeholder="Ví dụ: Giao vào giờ hành chính..."
                className="w-full px-6 py-4 bg-white border border-gray-100 rounded-2xl focus:ring-2 focus:ring-[#CC0000]/20 outline-none transition-all resize-none"
                value={formData.note}
                onChange={(e) => setFormData({...formData, note: e.target.value})}
              />
            </div>

            <div className="p-6 bg-gray-50 rounded-3xl space-y-4">
              <h3 className="text-xs font-black uppercase tracking-widest text-gray-400">Phương thức thanh toán</h3>
              <div className="flex items-center gap-4 p-4 bg-white border-2 border-[#CC0000] rounded-2xl">
                <div className="w-10 h-10 bg-[#CC0000]/10 rounded-xl flex items-center justify-center text-[#CC0000]">
                  <CreditCard size={20} />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-black text-gray-900 uppercase">Thanh toán khi nhận hàng (COD)</p>
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Giao hàng và thu tiền tận nơi</p>
                </div>
                <CheckCircle2 className="text-[#CC0000]" size={24} />
              </div>
            </div>

            {error && (
              <div className="p-4 bg-red-50 text-red-600 rounded-2xl flex items-center gap-3 text-sm font-bold animate-in fade-in slide-in-from-top-2">
                <AlertCircle size={20} />
                {error}
              </div>
            )}

            <button 
              type="submit"
              disabled={isSubmitting}
              className="w-full honda-btn !py-6 text-lg flex items-center justify-center gap-3 shadow-2xl shadow-red-500/30"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="animate-spin" size={24} /> ĐANG XỬ LÝ...
                </>
              ) : (
                <>XÁC NHẬN ĐẶT HÀNG — {formatCurrency(total)}</>
              )}
            </button>
          </form>
        </div>

        {/* Right: Order Summary */}
        <div className="lg:col-span-5">
          <div className="sticky top-32 space-y-8">
            <div className="p-10 bg-white rounded-[40px] border border-gray-100 shadow-xl space-y-8">
              <h3 className="text-xl font-black uppercase tracking-tight">Tóm tắt đơn hàng</h3>
              
              <div className="space-y-6 max-h-[400px] overflow-y-auto pr-2">
                {items.map((item) => (
                  <div key={item.id} className="flex gap-4">
                    <div className="w-16 h-16 bg-gray-50 rounded-xl overflow-hidden border border-gray-100">
                      <img src={item.imageUrl} alt={item.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1 space-y-1">
                      <h4 className="text-sm font-black text-gray-900 line-clamp-1 uppercase">{item.name}</h4>
                      <p className="text-xs text-gray-400 font-bold uppercase tracking-widest">SL: {item.quantity}</p>
                      <p className="text-sm font-black text-[#CC0000]">{formatCurrency(item.price * item.quantity)}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="pt-8 border-t border-gray-100 space-y-4">
                <div className="flex justify-between text-sm font-bold text-gray-400 uppercase tracking-widest">
                  <span>Tạm tính</span>
                  <span className="text-gray-900">{formatCurrency(subtotal)}</span>
                </div>
                <div className="flex justify-between text-sm font-bold text-gray-400 uppercase tracking-widest">
                  <span>Phí giao hàng</span>
                  <span className="text-gray-900">{formatCurrency(shipping)}</span>
                </div>
                <div className="flex justify-between items-end pt-4">
                  <span className="text-lg font-black uppercase tracking-tight">Tổng thanh toán</span>
                  <span className="text-3xl font-black text-[#CC0000] tracking-tighter">{formatCurrency(total)}</span>
                </div>
              </div>
            </div>

            <div className="p-8 bg-gray-50 rounded-[32px] flex items-center gap-6">
              <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-[#CC0000] shadow-sm">
                <ShieldCheck size={24} />
              </div>
              <div className="space-y-1">
                <p className="text-xs font-black uppercase tracking-widest">Thanh toán an toàn</p>
                <p className="text-[10px] font-bold text-gray-400 leading-relaxed uppercase">Dữ liệu của bạn luôn được bảo mật tuyệt đối 100%.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
