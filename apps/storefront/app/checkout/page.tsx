'use client';

import { useState, useRef, useEffect } from 'react';
import { useCartStore } from '@/store/useCartStore';
import { useAuthStore } from '@/store/useAuthStore';
import { createOrder, createMoMoPayment, getProfile } from '@/lib/api';
import { useRouter } from 'next/navigation';
import { toast } from 'react-hot-toast';
import { Loader2, Truck, Package, ShieldCheck } from 'lucide-react';

export default function CheckoutPage() {
  const { items, clearCart } = useCartStore();
  const { user, token } = useAuthStore();
  const router = useRouter();
  
  // Refs for focusing
  const nameRef = useRef<HTMLInputElement>(null);
  const phoneRef = useRef<HTMLInputElement>(null);
  const addressRef = useRef<HTMLInputElement>(null);
  
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    address: '',
    notes: ''
  });

  // Pre-fill form if user is logged in
  useEffect(() => {
    async function loadProfile() {
      if (!token) return;
      try {
        const profile = await getProfile(token);
        if (profile) {
          setFormData(prev => ({
            ...prev,
            name: profile.name || '',
            phone: profile.phone || '',
            address: profile.address || '',
          }));
        }
      } catch (err) {
        // Fallback to email if profile fetch fails
        if (user) {
          setFormData(prev => ({
            ...prev,
            name: prev.name || user.email.split('@')[0].toUpperCase(),
          }));
        }
      }
    }
    loadProfile();
  }, [token, user]);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<'COD' | 'MOMO'>('COD');

  const subtotal = items.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const shipping = 30000;
  const finalTotal = subtotal + shipping;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // 1. Validation and Auto-Focus
    if (!formData.name.trim()) {
      toast.error('Vui lòng nhập họ và tên');
      nameRef.current?.focus();
      return;
    }
    if (!formData.phone.trim()) {
      toast.error('Vui lòng nhập số điện thoại');
      phoneRef.current?.focus();
      return;
    }
    if (!formData.address.trim()) {
      toast.error('Vui lòng nhập địa chỉ giao hàng');
      addressRef.current?.focus();
      return;
    }

    setIsSubmitting(true);
    try {
      // 1. Create the order
      const order = await createOrder({
        customerName: formData.name,
        customerPhone: formData.phone,
        address: formData.address,
        paymentMethod: paymentMethod,
        items: items.map(item => ({
          partId: item.id,
          quantity: item.quantity,
          price: Number(item.price)
        }))
      }, token || undefined);

      // 2. Clear cart (both local and backend)
      await clearCart();

      // 3. Handle MoMo Redirect or COD success
      if (paymentMethod === 'MOMO') {
        const momoRes = await createMoMoPayment({
          orderId: order.id,
          amount: finalTotal,
          orderInfo: `Thanh toán đơn hàng ${order.orderNumber} tại Honda Đại Lợi`
        });

        if (momoRes.payUrl) {
          window.location.href = momoRes.payUrl;
          return;
        } else {
          throw new Error('MoMo failed to return payUrl');
        }
      }

      router.push('/checkout/success');
    } catch (err) {
      toast.error('Có lỗi xảy ra khi đặt hàng. Vui lòng thử lại.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-32 text-center">
        <h1 className="text-3xl font-black mb-4">GIỎ HÀNG TRỐNG</h1>
        <p className="text-gray-500 mb-8">Vui lòng chọn sản phẩm trước khi thanh toán.</p>
        <button onClick={() => router.push('/parts')} className="honda-btn inline-block">QUAY LẠI CỬA HÀNG</button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-20">
      <div className="flex flex-col lg:flex-row gap-12">
        {/* Left: Checkout Form */}
        <div className="flex-1 space-y-10">
          <div>
            <h1 className="text-4xl font-black text-gray-900 tracking-tighter uppercase mb-2">Thanh toán</h1>
            <p className="text-gray-500 font-medium italic">Hoàn tất đơn hàng của bạn.</p>
          </div>

          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-4">Họ và tên</label>
                <input
                  required
                  ref={nameRef}
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="NGUYỄN VĂN A"
                  className="w-full h-14 px-6 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-[#CC0000] transition-all font-bold text-gray-900"
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-4">Số điện thoại</label>
                <input
                  required
                  ref={phoneRef}
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="0901 234 567"
                  className="w-full h-14 px-6 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-[#CC0000] transition-all font-bold text-gray-900"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-4">Địa chỉ giao hàng</label>
              <input
                required
                ref={addressRef}
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                placeholder="Số nhà, Tên đường, Phường/Xã..."
                className="w-full h-14 px-6 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-[#CC0000] transition-all font-bold text-gray-900"
              />
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-4">Ghi chú (Tùy chọn)</label>
              <textarea
                name="notes"
                value={formData.notes}
                onChange={handleInputChange}
                placeholder="Ví dụ: Giao vào giờ hành chính..."
                className="w-full h-32 p-6 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-[#CC0000] transition-all font-bold resize-none text-gray-900"
              />
            </div>
          </div>

          <div className="space-y-6">
            <h3 className="text-xl font-black text-gray-900 uppercase tracking-tight">Phương thức thanh toán</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <button
                type="button"
                onClick={() => setPaymentMethod('COD')}
                className={`p-6 rounded-2xl border-2 transition-all flex flex-col items-start gap-3 ${
                  paymentMethod === 'COD' ? 'border-[#CC0000] bg-red-50/50' : 'border-gray-100 hover:border-gray-200'
                }`}
              >
                <Truck className={paymentMethod === 'COD' ? 'text-[#CC0000]' : 'text-gray-400'} />
                <div className="text-left">
                  <p className="font-black text-gray-900 uppercase text-xs">Thanh toán khi nhận hàng (COD)</p>
                  <p className="text-[10px] text-gray-500 font-medium">Nhận hàng rồi mới trả tiền</p>
                </div>
              </button>

              <button
                type="button"
                onClick={() => setPaymentMethod('MOMO')}
                className={`p-6 rounded-2xl border-2 transition-all flex flex-col items-start gap-3 ${
                  paymentMethod === 'MOMO' ? 'border-[#D82D8B] bg-pink-50/50' : 'border-gray-100 hover:border-gray-200'
                }`}
              >
                <div className="w-8 h-8 bg-[#D82D8B] rounded-lg flex items-center justify-center text-white font-black text-[10px]">MoMo</div>
                <div className="text-left">
                  <p className="font-black text-gray-900 uppercase text-xs">Ví MoMo</p>
                  <p className="text-[10px] text-gray-500 font-medium">Thanh toán nhanh qua ứng dụng MoMo</p>
                </div>
              </button>
            </div>
          </div>

          <button
            onClick={handleSubmit}
            disabled={isSubmitting}
            className={`w-full text-white h-16 rounded-2xl font-black text-lg hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50 disabled:hover:scale-100 flex items-center justify-center gap-2 shadow-xl shadow-gray-200 ${
              paymentMethod === 'MOMO' ? 'bg-[#D82D8B]' : 'bg-black'
            }`}
          >
            {isSubmitting ? <Loader2 className="animate-spin" /> : (
              paymentMethod === 'MOMO' ? 'THANH TOÁN QUA MOMO' : 'XÁC NHẬN ĐẶT HÀNG (COD)'
            )}
          </button>
        </div>

        {/* Right: Order Summary */}
        <div className="w-full lg:w-96">
          <div className="bg-white border border-gray-100 rounded-3xl p-8 sticky top-24 shadow-sm">
            <h2 className="text-xl font-black text-gray-900 uppercase mb-8 flex items-center gap-2">
              <Package size={20} className="text-[#CC0000]" /> Đơn hàng
            </h2>

            <div className="space-y-6 mb-8 max-h-64 overflow-y-auto pr-2 custom-scrollbar">
              {items.map((item) => (
                <div key={item.id} className="flex justify-between gap-4">
                  <div className="flex-1">
                    <p className="font-bold text-gray-900 text-sm line-clamp-1">{item.name}</p>
                    <p className="text-[10px] text-gray-400 font-bold uppercase">SL: {item.quantity}</p>
                  </div>
                  <p className="font-bold text-gray-900 text-sm">
                    {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(item.price * item.quantity)}
                  </p>
                </div>
              ))}
            </div>

            <div className="space-y-4 pt-6 border-t border-gray-50">
              <div className="flex justify-between text-sm">
                <span className="text-gray-500 font-medium uppercase tracking-wider text-[10px]">Tạm tính</span>
                <span className="font-bold text-gray-900">{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(subtotal)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500 font-medium uppercase tracking-wider text-[10px]">Phí vận chuyển</span>
                <span className="font-bold text-gray-900">{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(shipping)}</span>
              </div>
              <div className="flex justify-between items-center pt-4 border-t border-gray-100">
                <span className="text-gray-900 font-black uppercase text-sm tracking-tight">Tổng cộng</span>
                <span className="text-2xl font-black text-[#CC0000]">{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(finalTotal)}</span>
              </div>
            </div>

            <div className="mt-8 p-4 bg-gray-50 rounded-2xl flex items-start gap-3 border border-gray-100">
              <ShieldCheck className="text-green-600 mt-0.5 shrink-0" size={16} />
              <p className="text-[10px] text-gray-500 font-medium leading-relaxed">
                Thanh toán an toàn và bảo mật 100% qua cổng MoMo.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
