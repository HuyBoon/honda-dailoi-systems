import { ShieldCheck, Truck, Wrench, RotateCcw, PackageSearch, Users } from 'lucide-react';

export default function Features() {
  const features = [
    {
      icon: ShieldCheck,
      title: "Chính hãng 100%",
      desc: "Cam kết phụ tùng xé bịch tem đỏ. Nhập khẩu trực tiếp từ Honda VN, Thái Lan và Indo. Đền 1000% nếu phát hiện hàng giả.",
      size: "md:col-span-2 lg:col-span-2",
      color: "bg-[#CC0000] text-white shadow-xl shadow-red-200" // Điểm nhấn chính màu đỏ
    },
    {
      icon: Truck,
      title: "Đóng gói tiêu chuẩn",
      desc: "Chống móp méo, trầy xước dàn áo. Hỗ trợ giao hỏa tốc nội thành 2H cho anh em thợ cần gấp.",
      size: "md:col-span-1 lg:col-span-1",
      color: "bg-gray-900 text-white" // Đen nhám nam tính
    },
    {
      icon: PackageSearch,
      title: "Tra mã phụ tùng",
      desc: "Hỗ trợ check Part Number chuẩn xác bằng phần mềm. Bao đúng mã, ráp đúng xe.",
      size: "md:col-span-1 lg:col-span-1",
      color: "bg-gray-50 text-gray-900"
    },
    {
      icon: RotateCcw,
      title: "Bảo hành tiêu chuẩn",
      desc: "Lỗi NSX là đổi mới. Chính sách bảo hành minh bạch theo đúng quy định của Honda.",
      size: "md:col-span-1 lg:col-span-1",
      color: "bg-white border border-gray-100"
    },
    {
      icon: Users,
      title: "Chiết khấu cho Thợ",
      desc: "Nguồn hàng sẵn số lượng lớn. Chính sách giá sỉ cực tốt cho cửa hàng và anh em thợ máy.",
      size: "md:col-span-2 lg:col-span-1",
      color: "bg-red-50 text-[#CC0000]"
    }
  ];

  return (
    <section className="py-20">
      <div className="container mx-auto px-4 lg:px-8">
        
        {/* Tiêu đề Section */}
        <div className="mb-12 md:mb-16 text-center max-w-2xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tighter text-gray-900 mb-4">
            Tại sao chọn <span className="text-[#CC0000]">Honda Đại Lợi?</span>
          </h2>
          <p className="text-gray-500 font-medium">
            Hệ thống phân phối phụ tùng xe máy Honda uy tín, đáp ứng mọi nhu cầu từ bảo dưỡng cơ bản đến sửa chữa chuyên sâu.
          </p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((f, i) => (
            <div 
              key={i} 
              className={`
                p-8 lg:p-10 rounded-[2.5rem] flex flex-col justify-between transition-all duration-500 hover:-translate-y-1 hover:shadow-2xl group
                ${f.size} ${f.color}
              `}
            >
              <div className={`
                w-14 h-14 rounded-2xl flex items-center justify-center mb-10 transition-transform duration-500 group-hover:rotate-12 group-hover:scale-110
                ${f.color.includes('bg-white') ? 'bg-gray-50 text-gray-700' : 
                  f.color.includes('bg-red-50') ? 'bg-white text-[#CC0000] shadow-sm' : 
                  'bg-white/10 text-white'}
              `}>
                <f.icon size={28} strokeWidth={2.5} />
              </div>
              
              <div>
                <h3 className="text-xl font-black uppercase tracking-tight mb-3 leading-tight">{f.title}</h3>
                <p className={`text-sm font-medium leading-relaxed ${
                  f.color.includes('text-white') ? 'text-white/80' : 'text-gray-600'
                }`}>
                  {f.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
        
      </div>
    </section>
  );
}