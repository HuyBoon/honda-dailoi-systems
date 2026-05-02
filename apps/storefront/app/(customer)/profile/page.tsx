'use client';

import { useState, useEffect } from 'react';
import { useAuthStore } from '@/store/useAuthStore';
import { User, Mail, Phone, MapPin, Save, ShieldCheck, Loader2 } from 'lucide-react';
import { toast } from 'react-hot-toast';

export default function ProfilePage() {
  const { user } = useAuthStore();
  const [isLoading, setIsLoading] = useState(false);

  // Khởi tạo state cho form. 
  // (Nếu API lúc đăng nhập của bạn có trả về name, phone, address thì nó sẽ tự điền vào đây)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: ''
  });

  useEffect(() => {
    if (user) {
      setFormData({
        name: (user as any).name || '',
        email: user.email || '',
        phone: (user as any).phone || '',
        address: (user as any).address || ''
      });
    }
  }, [user]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Ở đây bạn sẽ gọi API để cập nhật thông tin user (VD: updateProfile(formData))
    // Tạm thời mình dùng setTimeout để giả lập độ trễ của API
    try {
      await new Promise(resolve => setTimeout(resolve, 800));
      toast.success('Cập nhật thông tin thành công!');
    } catch (error) {
      toast.error('Có lỗi xảy ra, vui lòng thử lại sau.');
    } finally {
      setIsLoading(false);
    }
  };

  if (!user) return null; // CustomerLayout đã chặn rồi, nhưng cứ để đây cho an toàn type

  return (
    <div className="animate-in fade-in duration-500">
      {/* Header */}
      <div className="mb-8 border-b border-gray-100 pb-6 flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-black text-gray-900 uppercase tracking-tight mb-1">Thông tin tài khoản</h1>
          <p className="text-gray-500 font-medium text-sm">Quản lý thông tin cá nhân và cách thức liên hệ của bạn.</p>
        </div>
        
        {/* Badge xác thực */}
        <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 bg-green-50 text-green-600 rounded-xl">
          <ShieldCheck size={16} />
          <span className="text-[10px] font-black uppercase tracking-widest">Đã xác thực</span>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="max-w-3xl">
        {/* Avatar Section */}
        <div className="flex items-center gap-6 mb-10">
          <div className="relative group cursor-pointer">
            <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center text-2xl font-black text-gray-400 shadow-sm ring-4 ring-gray-50 group-hover:ring-[#CC0000]/20 transition-all">
              {user.email[0].toUpperCase()}
            </div>
            <div className="absolute inset-0 bg-black/40 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
              <span className="text-white text-[10px] font-bold uppercase tracking-widest">Sửa</span>
            </div>
          </div>
          <div>
            <h3 className="text-lg font-black text-gray-900">Ảnh đại diện</h3>
            <p className="text-xs text-gray-500 font-medium mt-1">Định dạng JPG, PNG. Kích thước tối đa 2MB.</p>
          </div>
        </div>

        {/* Input Fields */}
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Họ và tên */}
            <div className="space-y-2">
              <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-4">Họ và tên</label>
              <div className="relative">
                <input
                  name="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Nhập họ và tên..."
                  className="w-full h-14 pl-12 pr-6 bg-gray-50 border border-transparent rounded-2xl focus:bg-white focus:border-[#CC0000]/30 focus:ring-2 focus:ring-[#CC0000]/10 transition-all font-bold text-gray-900 outline-none"
                />
                <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              </div>
            </div>

            {/* Số điện thoại */}
            <div className="space-y-2">
              <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-4">Số điện thoại</label>
              <div className="relative">
                <input
                  name="phone"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="0901 234 567"
                  className="w-full h-14 pl-12 pr-6 bg-gray-50 border border-transparent rounded-2xl focus:bg-white focus:border-[#CC0000]/30 focus:ring-2 focus:ring-[#CC0000]/10 transition-all font-bold text-gray-900 outline-none"
                />
                <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              </div>
            </div>
          </div>

          {/* Email (Readonly vì thường email dùng để đăng nhập) */}
          <div className="space-y-2">
            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-4">Địa chỉ Email (Không thể thay đổi)</label>
            <div className="relative opacity-60 cursor-not-allowed">
              <input
                readOnly
                value={formData.email}
                className="w-full h-14 pl-12 pr-6 bg-gray-100 border-none rounded-2xl font-bold text-gray-600 outline-none"
              />
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
            </div>
          </div>

          {/* Địa chỉ giao hàng mặc định */}
          <div className="space-y-2">
            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-4">Địa chỉ giao hàng mặc định</label>
            <div className="relative">
              <input
                name="address"
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                placeholder="Số nhà, Tên đường, Quận/Huyện, Tỉnh/Thành phố..."
                className="w-full h-14 pl-12 pr-6 bg-gray-50 border border-transparent rounded-2xl focus:bg-white focus:border-[#CC0000]/30 focus:ring-2 focus:ring-[#CC0000]/10 transition-all font-bold text-gray-900 outline-none"
              />
              <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            </div>
          </div>
        </div>

        {/* Nút Submit */}
        <div className="mt-10 pt-8 border-t border-gray-100 flex justify-end">
          <button
            type="submit"
            disabled={isLoading}
            className="h-14 px-8 bg-[#CC0000] text-white rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-red-700 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2 shadow-lg shadow-red-200 disabled:opacity-50 disabled:hover:scale-100"
          >
            {isLoading ? (
              <Loader2 className="animate-spin" size={18} />
            ) : (
              <>
                <Save size={18} /> LƯU THAY ĐỔI
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}