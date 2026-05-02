import Link from 'next/link';
import { LayoutGrid, SlidersHorizontal, X, ChevronRight } from 'lucide-react';

interface PartsSidebarProps {
  categories: any[];
  vehicles: any[];
  searchParams: any;
}

export default function PartsSidebar({ categories, vehicles, searchParams }: PartsSidebarProps) {
  const hasFilters = searchParams.categoryId || searchParams.vehicleId || searchParams.query;

  return (
    <aside className="w-full lg:w-80 space-y-6 lg:sticky lg:top-24 h-fit">
      {/* Active Filters Summary */}
      {hasFilters && (
        <div className="glass p-6 rounded-[32px] border border-gray-100 shadow-sm space-y-4">
          <div className="flex justify-between items-center">
            <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Đang lọc</h4>
            <Link href="/parts" className="text-[10px] font-black text-[#CC0000] hover:underline uppercase">Xóa tất cả</Link>
          </div>
          <div className="flex flex-wrap gap-2">
            {searchParams.query && (
              <span className="px-3 py-1.5 bg-gray-900 text-white text-[10px] font-bold rounded-lg flex items-center gap-2">
                "{searchParams.query}" <X size={10} />
              </span>
            )}
            {searchParams.categoryId && (
              <span className="px-3 py-1.5 bg-red-50 text-[#CC0000] text-[10px] font-bold rounded-lg border border-red-100 flex items-center gap-2">
                {categories.find(c => c.id === searchParams.categoryId)?.name || 'Danh mục'} <X size={10} />
              </span>
            )}
            {searchParams.vehicleId && (
              <span className="px-3 py-1.5 bg-gray-50 text-gray-900 text-[10px] font-bold rounded-lg border border-gray-100 flex items-center gap-2">
                {vehicles.find(v => v.id === searchParams.vehicleId)?.modelName || 'Dòng xe'} <X size={10} />
              </span>
            )}
          </div>
        </div>
      )}

      {/* Categories & Vehicles */}
      <div className="bg-white p-8 rounded-[40px] border border-gray-100 shadow-sm space-y-8">
        <div>
          <h3 className="text-xs font-black uppercase tracking-[0.2em] mb-6 flex items-center gap-3">
            <div className="w-1.5 h-1.5 bg-[#CC0000] rounded-full" /> Danh mục
          </h3>
          <div className="flex flex-col gap-1">
            <FilterLink 
              href="/parts" 
              active={!searchParams.categoryId}
              icon={<LayoutGrid size={14} />}
            >
              Tất cả sản phẩm
            </FilterLink>
            {categories.map((cat: any) => (
              <FilterLink 
                key={cat.id} 
                href={`/parts?categoryId=${cat.id}${searchParams.vehicleId ? `&vehicleId=${searchParams.vehicleId}` : ''}${searchParams.query ? `&query=${searchParams.query}` : ''}`} 
                active={searchParams.categoryId === cat.id}
              >
                {cat.name}
              </FilterLink>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-xs font-black uppercase tracking-[0.2em] mb-6 flex items-center gap-3">
            <div className="w-1.5 h-1.5 bg-[#CC0000] rounded-full" /> Dòng xe phù hợp
          </h3>
          <div className="flex flex-wrap gap-2">
            <VehicleTag 
              href="/parts" 
              active={!searchParams.vehicleId}
            >
              Tất cả
            </VehicleTag>
            {vehicles.map((v: any) => (
              <VehicleTag 
                key={v.id} 
                href={`/parts?vehicleId=${v.id}${searchParams.categoryId ? `&categoryId=${searchParams.categoryId}` : ''}${searchParams.query ? `&query=${searchParams.query}` : ''}`} 
                active={searchParams.vehicleId === v.id}
              >
                {v.modelName}
              </VehicleTag>
            ))}
          </div>
        </div>
      </div>

      {/* Help Card */}
      <div className="bg-[#CC0000] p-8 rounded-[40px] text-white space-y-4 relative overflow-hidden group">
        <div className="absolute -right-4 -bottom-4 opacity-10 group-hover:scale-125 transition-transform duration-700">
          <SlidersHorizontal size={120} />
        </div>
        <h4 className="text-lg font-black leading-tight uppercase">Không tìm thấy phụ tùng?</h4>
        <p className="text-xs text-white/70 font-medium leading-relaxed">Gửi yêu cầu báo giá hoặc gọi ngay hotline để được kỹ thuật viên hỗ trợ tra mã.</p>
        <button className="w-full py-4 bg-white text-black rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-black hover:text-white transition-all">
          Gọi 1900 1234
        </button>
      </div>
    </aside>
  );
}

function FilterLink({ href, children, active, icon }: { href: string; children: React.ReactNode; active?: boolean; icon?: React.ReactNode }) {
  return (
    <Link 
      href={href} 
      className={`
        flex items-center justify-between px-5 py-3 rounded-2xl text-[11px] font-black uppercase tracking-widest transition-all
        ${active 
          ? 'bg-black text-white shadow-xl translate-x-2' 
          : 'text-gray-500 hover:bg-gray-50 hover:text-black'
        }
      `}
    >
      <span className="flex items-center gap-3">
        {icon}
        {children}
      </span>
      {active && <ChevronRight size={14} className="text-[#CC0000]" />}
    </Link>
  );
}

function VehicleTag({ href, children, active }: { href: string; children: React.ReactNode; active?: boolean }) {
  return (
    <Link 
      href={href} 
      className={`
        px-4 py-2 rounded-xl text-[10px] font-bold uppercase tracking-widest border transition-all
        ${active 
          ? 'bg-black border-black text-white shadow-lg' 
          : 'bg-white border-gray-100 text-gray-500 hover:border-[#CC0000] hover:text-[#CC0000]'
        }
      `}
    >
      {children}
    </Link>
  );
}
