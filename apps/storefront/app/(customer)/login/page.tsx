'use client';

import { useEffect, useState } from 'react';
import { login } from '@/lib/api';
import { useAuthStore } from '@/store/useAuthStore';
import { useRouter } from 'next/navigation';
import { toast } from 'react-hot-toast';
import { Loader2, Mail, Lock, ChevronRight } from 'lucide-react';
import Link from 'next/link';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { user, setAuth } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    if (user) {
      router.push('/');
    }
  }, [user, router]);
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const data = await login({ email, password });
      // Sửa data.token thành data.access_token
      setAuth(data.user, data.access_token);
      toast.success('Đăng nhập thành công!');
      
      if (data.user.role === 'ADMIN' || data.user.role === 'MANAGER') {
        window.location.href = 'http://localhost:5173'; 
      } else {
        router.push('/');
      }
    } catch (err: any) {
      toast.error(err.message || 'Email hoặc mật khẩu không chính xác');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-32 flex justify-center">
      <div className="w-full max-w-md">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-black text-gray-900 uppercase tracking-tighter mb-2">Đăng nhập</h1>
          <p className="text-gray-500 font-medium italic text-sm">Chào mừng bạn quay lại Honda Đại Lợi.</p>
        </div>

        <div className="bg-white p-8 rounded-3xl shadow-xl shadow-gray-100 border border-gray-100">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-4">Email</label>
              <div className="relative">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com"
                  className="w-full h-14 pl-12 pr-6 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-[#CC0000] transition-all font-bold"
                />
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center px-4">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Mật khẩu</label>
                <Link href="#" className="text-[10px] font-bold text-[#CC0000] uppercase tracking-wider hover:underline">Quên mật khẩu?</Link>
              </div>
              <div className="relative">
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full h-14 pl-12 pr-6 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-[#CC0000] transition-all font-bold"
                />
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full h-16 bg-black text-white rounded-2xl font-black text-lg hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2 shadow-lg shadow-gray-200 disabled:opacity-50"
            >
              {isLoading ? <Loader2 className="animate-spin" /> : 'ĐĂNG NHẬP'}
            </button>
          </form>

          <div className="mt-8 pt-8 border-t border-gray-50 text-center">
            <p className="text-xs text-gray-500 font-bold uppercase tracking-wide">
              Chưa có tài khoản?{' '}
              <Link href="/register" className="text-[#CC0000] hover:underline inline-flex items-center gap-1">
                Đăng ký ngay <ChevronRight size={14} />
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
