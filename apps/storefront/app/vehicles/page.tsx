import { getVehicles } from '@/lib/api';
import Link from 'next/link';
import { ArrowRight, Bike, Search } from 'lucide-react';
import PageHeader from '@/components/PageHeader';
import Pagination from '@/components/Pagination';

export default async function VehiclesPage(props: {
  searchParams: Promise<{ page?: string; query?: string }>;
}) {
  const searchParams = await props.searchParams;
  const currentPage = Number(searchParams.page) || 1;
  const pageSize = 12;

  const vehiclesData = await getVehicles({ page: currentPage, limit: pageSize });
  const vehicles = vehiclesData.items || [];

  return (
    <div className="min-h-screen bg-[#FDFDFD]">
      <PageHeader 
        title={<>Tìm phụ tùng <br /> <span className="text-[#CC0000]">Theo dòng xe.</span></>}
        subtitle="Hệ sinh thái dòng xe"
        breadcrumbs={[
          { label: 'Dòng xe' }
        ]}
        image="https://images.unsplash.com/photo-1558981403-c5f91cbba527?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80"
      />

      <div className="container mx-auto px-4 lg:px-8 -mt-8 relative z-20 pb-32">
        <div className="space-y-12">
          {/* Top Bar / Search */}
          <div className="bg-white p-4 lg:p-6 rounded-[40px] border border-gray-100 shadow-sm flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="relative w-full md:max-w-md group">
              <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#CC0000] transition-colors" size={20} />
              <input 
                type="text" 
                placeholder="Tìm kiếm dòng xe (VD: SH, Vision...)"
                className="w-full pl-16 pr-6 py-4 bg-gray-50 border-none rounded-[28px] text-sm font-medium focus:ring-4 focus:ring-[#CC0000]/10 outline-none transition-all"
              />
            </div>
            <div className="text-sm font-bold text-gray-400 uppercase tracking-widest px-4">
              Hiển thị <span className="text-gray-900">{vehicles.length}</span> / <span className="text-gray-900">{vehiclesData.total}</span> dòng xe
            </div>
          </div>

          {/* Vehicles Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {vehicles.map((vehicle: any) => (
              <Link 
                key={vehicle.id} 
                href={`/parts?vehicleId=${vehicle.id}`}
                className="honda-card p-8 flex flex-col items-center text-center space-y-6 group relative overflow-hidden"
              >
                {/* Hover Background Accent */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#CC0000]/5 rounded-full blur-3xl translate-x-1/2 -translate-y-1/2 group-hover:bg-[#CC0000]/10 transition-colors" />
                
                <div className="w-24 h-24 bg-gray-50 rounded-[32px] flex items-center justify-center text-gray-300 group-hover:bg-black group-hover:text-[#CC0000] transition-all duration-500 transform group-hover:rotate-6 group-hover:scale-110 shadow-sm">
                  <Bike size={48} />
                </div>
                
                <div className="space-y-2 relative z-10">
                  <h3 className="text-2xl font-black uppercase tracking-tight text-gray-900 group-hover:text-[#CC0000] transition-colors leading-tight">
                    {vehicle.modelName}
                  </h3>
                  <div className="flex flex-wrap justify-center gap-2">
                    <span className="px-3 py-1 bg-gray-100 text-[10px] font-black uppercase tracking-widest rounded-lg text-gray-500">
                      Đời {vehicle.year}
                    </span>
                    {vehicle.engineSize && (
                      <span className="px-3 py-1 bg-[#CC0000]/10 text-[10px] font-black uppercase tracking-widest rounded-lg text-[#CC0000]">
                        {vehicle.engineSize}
                      </span>
                    )}
                  </div>
                </div>

                <div className="pt-4 flex items-center gap-2 text-black text-[10px] font-black uppercase tracking-[0.2em] group-hover:text-[#CC0000] transition-all">
                  Tra cứu linh kiện <ArrowRight size={14} className="group-hover:translate-x-2 transition-transform" />
                </div>
              </Link>
            ))}
          </div>

          {/* Pagination */}
          <Pagination 
            currentPage={currentPage}
            totalPages={vehiclesData.totalPages}
            searchParams={searchParams}
            baseUrl="/vehicles"
          />

          {/* Support CTA */}
          <div className="p-12 bg-black rounded-[4rem] text-white overflow-hidden relative group">
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#CC0000]/10 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2 group-hover:bg-[#CC0000]/20 transition-colors duration-1000" />
            <div className="flex flex-col lg:flex-row items-center justify-between gap-12 relative z-10">
              <div className="flex items-center gap-8 text-center lg:text-left flex-col lg:flex-row">
                <div className="w-20 h-20 bg-[#CC0000] rounded-[2rem] flex items-center justify-center text-white shadow-2xl shadow-red-500/40">
                  <Bike size={40} />
                </div>
                <div className="space-y-2">
                  <h4 className="text-3xl font-black uppercase tracking-tight">Không tìm thấy đời xe?</h4>
                  <p className="text-gray-400 font-medium max-w-xl">Hệ thống của chúng tôi cập nhật liên tục. Nếu dòng xe của bạn không có trong danh sách, hãy gọi hotline để được tra cứu thủ công.</p>
                </div>
              </div>
              <button className="h-16 px-10 bg-white text-black rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-[#CC0000] hover:text-white transition-all shadow-xl hover:scale-105 active:scale-95">
                Kỹ thuật viên hỗ trợ
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
