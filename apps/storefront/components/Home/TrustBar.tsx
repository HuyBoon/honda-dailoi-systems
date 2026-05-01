import { Truck, ShieldCheck, RotateCcw, Wrench } from 'lucide-react';

export default function TrustBar() {
  return (
    <section className="container mx-auto px-4 lg:px-8">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
        <TrustItem 
          icon={<Truck className="text-[#CC0000]" />} 
          title="Giao hàng nhanh" 
          desc="Toàn quốc 24-48h" 
        />
        <TrustItem 
          icon={<ShieldCheck className="text-[#CC0000]" />} 
          title="Bảo hành dài hạn" 
          desc="Chính sách lỗi 1 đổi 1" 
        />
        <TrustItem 
          icon={<RotateCcw className="text-[#CC0000]" />} 
          title="Đổi trả dễ dàng" 
          desc="Trong vòng 7 ngày" 
        />
        <TrustItem 
          icon={<Wrench className="text-[#CC0000]" />} 
          title="Kỹ thuật hỗ trợ" 
          desc="Tư vấn lắp đặt free" 
        />
      </div>
    </section>
  );
}

function TrustItem({ icon, title, desc }: { icon: React.ReactNode; title: string; desc: string }) {
  return (
    <div className="flex items-center gap-4 group">
      <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center shadow-lg transition-transform group-hover:-rotate-6">
        {icon}
      </div>
      <div>
        <p className="font-black text-gray-900 text-sm uppercase">{title}</p>
        <p className="text-xs text-gray-500 font-bold">{desc}</p>
      </div>
    </div>
  );
}
