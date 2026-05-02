'use client';

import { Settings as SettingsIcon, Bell, Lock, Shield } from 'lucide-react';

export default function SettingsPage() {
  return (
    <div>
      <div className="mb-10">
        <h1 className="text-3xl font-black text-gray-900 uppercase tracking-tighter mb-2">Cài đặt tài khoản</h1>
        <p className="text-gray-400 font-medium italic text-sm">Quản lý bảo mật và thông báo của bạn.</p>
      </div>

      <div className="space-y-4">
        {[
          { icon: Lock, title: 'Đổi mật khẩu', desc: 'Thay đổi mật khẩu đăng nhập của bạn.' },
          { icon: Bell, title: 'Thông báo', desc: 'Quản lý cách chúng tôi liên hệ với bạn.' },
          { icon: Shield, title: 'Quyền riêng tư', desc: 'Quản lý dữ liệu và quyền truy cập.' },
        ].map((item, idx) => (
          <button key={idx} className="w-full flex items-center justify-between p-6 bg-white border border-gray-100 rounded-3xl hover:bg-gray-50 transition-all text-left group">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gray-50 rounded-2xl flex items-center justify-center text-gray-400 group-hover:text-[#CC0000] group-hover:bg-red-50 transition-colors">
                <item.icon size={24} />
              </div>
              <div>
                <h3 className="font-bold text-gray-900">{item.title}</h3>
                <p className="text-xs text-gray-400 font-medium">{item.desc}</p>
              </div>
            </div>
            <div className="w-10 h-10 rounded-full flex items-center justify-center text-gray-300 group-hover:text-[#CC0000] transition-colors">
              <SettingsIcon size={20} />
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
