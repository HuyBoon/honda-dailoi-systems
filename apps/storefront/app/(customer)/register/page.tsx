'use client';

import { useState } from 'react';
import { register } from '@/lib/api';
import { useRouter } from 'next/navigation';
import { toast } from 'react-hot-toast';
import { Loader2, Mail, Lock, User, Phone, MapPin, ChevronRight, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '', // Thêm state cho Xác nhận mật khẩu
    name: '',
    phone: '',
    address: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate Frontend cơ bản
    if (formData.password.length < 6) {
      toast.error('Mật khẩu phải có ít nhất 6 ký tự!');
      return;
    }
    
    if (formData.password !== formData.confirmPassword) {
      toast.error('Mật khẩu xác nhận không khớp!');
      return;
    }

    setIsLoading(true);

    try {
      // Loại bỏ confirmPassword ra khỏi payload gửi lên server
      const { confirmPassword, ...registerData } = formData;
      await register(registerData);
      
      toast.success('Đăng ký thành công! Vui lòng đăng nhập.');
      router.push(`/login?email=${encodeURIComponent(formData.email)}`); // Truyền email qua trang login cho tiện
    } catch (err: any) {
      // Hiển thị lỗi từ backend (ví dụ: Email đã tồn tại)
      toast.error(err.message || 'Đăng ký thất bại. Vui lòng thử lại sau.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-20 flex justify-center">
      <div className="w-full max-w-xl">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-black text-gray-900 uppercase tracking-tighter mb-2">Đăng ký thành viên</h1>
          <p className="text-gray-500 font-medium italic text-sm">Tham gia cộng đồng Honda Đại Lợi để nhận nhiều ưu đãi.</p>
        </div>

        <div className="bg-white p-8 md:p-12 rounded-3xl shadow-xl shadow-gray-100 border border-gray-100">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-4">Họ và tên</label>
                <div className="relative">
                  <input
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Nguyễn Văn A"
                    className="w-full h-14 pl-12 pr-6 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-[#CC0000] transition-all font-bold"
                  />
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-4">Số điện thoại</label>
                <div className="relative">
                  <input
                    name="phone"
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="0901 234 567"
                    className="w-full h-14 pl-12 pr-6 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-[#CC0000] transition-all font-bold"
                  />
                  <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-4">Email</label>
              <div className="relative">
                <input
                  name="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="name@example.com"
                  className="w-full h-14 pl-12 pr-6 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-[#CC0000] transition-all font-bold"
                />
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              </div>
            </div>

            {/* Hàng chứa 2 cột Mật khẩu */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-4">Mật khẩu</label>
                <div className="relative">
                  <input
                    name="password"
                    type="password"
                    required
                    value={formData.password}
                    onChange={handleInputChange}
                    placeholder="••••••••"
                    className="w-full h-14 pl-12 pr-6 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-[#CC0000] transition-all font-bold"
                  />
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-4">Xác nhận mật khẩu</label>
                <div className="relative">
                  <input
                    name="confirmPassword"
                    type="password"
                    required
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    placeholder="••••••••"
                    className="w-full h-14 pl-12 pr-6 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-[#CC0000] transition-all font-bold"
                  />
                  <CheckCircle2 className={`absolute left-4 top-1/2 -translate-y-1/2 transition-colors ${formData.confirmPassword && formData.password === formData.confirmPassword ? 'text-green-500' : 'text-gray-400'}`} size={18} />
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-4">Địa chỉ giao hàng</label>
              <div className="relative">
                <input
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  placeholder="Số nhà, Tên đường..."
                  className="w-full h-14 pl-12 pr-6 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-[#CC0000] transition-all font-bold"
                />
                <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full h-16 bg-[#CC0000] text-white rounded-2xl font-black text-lg hover:bg-red-700 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2 shadow-lg shadow-red-200 disabled:opacity-50"
            >
              {isLoading ? <Loader2 className="animate-spin" /> : 'ĐĂNG KÝ TÀI KHOẢN'}
            </button>
          </form>

          <div className="mt-8 pt-8 border-t border-gray-50 text-center">
            <p className="text-xs text-gray-500 font-bold uppercase tracking-wide">
              Đã có tài khoản?{' '}
              <Link href="/login" className="text-[#CC0000] hover:underline inline-flex items-center gap-1">
                Đăng nhập ngay <ChevronRight size={14} />
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}