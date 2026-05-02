import { getVehicles } from '@/lib/api';
import Link from 'next/link';
import { ArrowRight, Bike } from 'lucide-react';

export default async function VehiclesPage() {
  const vehiclesData = await getVehicles({ limit: 100 });
  const vehicles = vehiclesData.items;

  return (
    <div className="container mx-auto px-4 lg:px-8 py-16">
      <div className="max-w-2xl mb-20 space-y-4">
        <span className="text-[#CC0000] text-xs font-black uppercase tracking-[0.3em]">Hệ sinh thái dòng xe</span>
        <h1 className="text-5xl font-black text-gray-900 tracking-tighter uppercase leading-tight">
          TÌM PHỤ TÙNG <br />
          <span className="text-[#CC0000]">THEO DÒNG XE</span>
        </h1>
        <p className="text-lg text-gray-500 font-medium">
          Dễ dàng tìm kiếm các linh kiện phù hợp nhất cho chiếc xe của bạn bằng cách lựa chọn đúng mẫu xe và năm sản xuất dưới đây.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {vehicles.map((vehicle: any) => (
          <Link 
            key={vehicle.id} 
            href={`/parts?vehicleId=${vehicle.id}`}
            className="honda-card p-8 flex flex-col items-center text-center space-y-6 group"
          >
            <div className="w-20 h-20 bg-gray-50 rounded-[30px] flex items-center justify-center text-gray-300 group-hover:bg-[#CC0000]/10 group-hover:text-[#CC0000] transition-all duration-500">
              <Bike size={40} />
            </div>
            
            <div className="space-y-1">
              <h3 className="text-xl font-black uppercase tracking-tight text-gray-900 group-hover:text-[#CC0000] transition-colors">
                {vehicle.modelName}
              </h3>
              <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Đời xe: {vehicle.year}</p>
              {vehicle.engineSize && (
                <span className="inline-block mt-2 px-3 py-1 bg-gray-100 text-[10px] font-black uppercase tracking-wider rounded-lg text-gray-500">
                  {vehicle.engineSize}
                </span>
              )}
            </div>

            <div className="pt-4 flex items-center gap-2 text-[#CC0000] text-[10px] font-black uppercase tracking-[0.2em] opacity-0 group-hover:opacity-100 transition-all translate-y-2 group-hover:translate-y-0">
              Xem phụ tùng <ArrowRight size={14} />
            </div>
          </Link>
        ))}
      </div>

      {/* Helper Card */}
      <div className="mt-32 p-12 bg-white rounded-[40px] border border-gray-100 shadow-xl flex flex-col lg:flex-row items-center justify-between gap-8">
        <div className="flex items-center gap-6">
          <div className="w-16 h-16 bg-[#CC0000] rounded-2xl flex items-center justify-center text-white shadow-xl shadow-red-500/20">
            <Bike size={32} />
          </div>
          <div className="space-y-1">
            <h4 className="text-xl font-black uppercase tracking-tight">Không tìm thấy dòng xe của bạn?</h4>
            <p className="text-gray-500 font-medium text-sm">Chúng tôi hỗ trợ hàng trăm dòng xe Honda khác nhau. Hãy liên hệ hotline để được hỗ trợ kiểm tra phụ tùng.</p>
          </div>
        </div>
        <button className="honda-btn">HỖ TRỢ TƯ VẤN</button>
      </div>
    </div>
  );
}
