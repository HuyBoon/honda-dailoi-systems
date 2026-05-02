import { Truck, ShieldCheck, RotateCcw, Wrench, Globe, Clock } from 'lucide-react';

export default function Features() {
  const features = [
    {
      icon: Truck,
      title: "Giao hàng siêu tốc",
      desc: "Hệ thống vận chuyển tối ưu, nhận hàng trong vòng 24h nội thành.",
      size: "md:col-span-2",
      color: "bg-red-50 text-[#CC0000]"
    },
    {
      icon: ShieldCheck,
      title: "Chính hãng 100%",
      desc: "Cam kết phụ tùng nhập khẩu Honda VN/Thái Lan/Nhật Bản.",
      size: "md:col-span-1",
      color: "bg-gray-900 text-white"
    },
    {
      icon: Clock,
      title: "Hỗ trợ 24/7",
      desc: "Đội ngũ kỹ thuật trực tuyến giải đáp mọi thắc mắc.",
      size: "md:col-span-1",
      color: "bg-gray-50 text-gray-900"
    },
    {
      icon: Wrench,
      title: "Tư vấn kỹ thuật",
      desc: "Hỗ trợ hướng dẫn lắp đặt và bảo dưỡng miễn phí qua Video/Zalo.",
      size: "md:col-span-1",
      color: "bg-white border border-gray-100"
    },
    {
      icon: RotateCcw,
      title: "Đổi trả linh hoạt",
      desc: "Chính sách đổi trả trong 7 ngày nếu không vừa ý hoặc lỗi NSX.",
      size: "md:col-span-2",
      color: "bg-[#CC0000] text-white shadow-xl shadow-red-200"
    }
  ];

  return (
    <section className="container mx-auto px-4 lg:px-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {features.map((f, i) => (
          <div 
            key={i} 
            className={`
              p-10 rounded-[2.5rem] flex flex-col justify-between transition-all duration-500 hover:scale-[1.02] group
              ${f.size} ${f.color}
            `}
          >
            <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-10 transition-transform group-hover:rotate-12 ${f.color.includes('bg-white') ? 'bg-gray-50' : 'bg-white/10'}`}>
              <f.icon size={28} />
            </div>
            <div>
              <h3 className="text-xl font-black uppercase tracking-tight mb-3">{f.title}</h3>
              <p className="text-sm font-medium opacity-70 leading-relaxed">{f.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
