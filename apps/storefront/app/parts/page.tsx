import { getParts, getCategories, getVehicles } from '@/lib/api';
import PartCard from '@/components/PartCard';
import { Search, Filter, SlidersHorizontal, ChevronDown } from 'lucide-react';

export default async function PartsPage(props: {
  searchParams: Promise<{ query?: string; categoryId?: string; vehicleId?: string }>;
}) {
  const searchParams = await props.searchParams;
  
  const [parts, categories, vehicles] = await Promise.all([
    getParts(searchParams),
    getCategories(),
    getVehicles(),
  ]);

  return (
    <div className="container mx-auto px-4 lg:px-8 py-12">
      <div className="flex flex-col lg:flex-row gap-12">
        {/* SIDEBAR FILTERS */}
        <aside className="w-full lg:w-72 space-y-10">
          <div>
            <h3 className="text-lg font-black uppercase tracking-widest mb-6 flex items-center gap-2">
              <Filter size={18} className="text-[#CC0000]" /> Danh mục
            </h3>
            <div className="space-y-2">
              <FilterLink href="/parts" active={!searchParams.categoryId}>Tất cả sản phẩm</FilterLink>
              {categories.map((cat: any) => (
                <FilterLink 
                  key={cat.id} 
                  href={`/parts?categoryId=${cat.id}`} 
                  active={searchParams.categoryId === cat.id}
                >
                  {cat.name}
                </FilterLink>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-lg font-black uppercase tracking-widest mb-6 flex items-center gap-2">
              <SlidersHorizontal size={18} className="text-[#CC0000]" /> Dòng xe
            </h3>
            <div className="space-y-2">
              <FilterLink href="/parts" active={!searchParams.vehicleId}>Tất cả dòng xe</FilterLink>
              {vehicles.map((v: any) => (
                <FilterLink 
                  key={v.id} 
                  href={`/parts?vehicleId=${v.id}`} 
                  active={searchParams.vehicleId === v.id}
                >
                  {v.modelName}
                </FilterLink>
              ))}
            </div>
          </div>
        </aside>

        {/* MAIN CONTENT */}
        <div className="flex-1 space-y-8">
          {/* Top Bar */}
          <div className="flex flex-col md:flex-row justify-between items-center gap-6 p-6 glass rounded-[32px]">
            <div className="flex items-center gap-4">
              <p className="text-sm font-bold text-gray-500 uppercase tracking-widest">
                Hiển thị <span className="text-gray-900">{parts.length}</span> sản phẩm
              </p>
            </div>
            
            <div className="flex gap-4 w-full md:w-auto">
              <div className="relative flex-1 md:w-80">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <input 
                  type="text" 
                  placeholder="Tìm kiếm phụ tùng..."
                  defaultValue={searchParams.query || ''}
                  className="w-full pl-12 pr-4 py-3 bg-white border border-gray-100 rounded-2xl text-sm focus:ring-2 focus:ring-[#CC0000]/20 outline-none transition-all"
                />
              </div>
              <button className="px-6 py-3 bg-white border border-gray-100 rounded-2xl flex items-center gap-2 text-sm font-bold hover:bg-gray-50 transition-all">
                Mới nhất <ChevronDown size={16} />
              </button>
            </div>
          </div>

          {/* Results Grid */}
          {parts.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-32 space-y-6">
              <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center text-gray-300">
                <Search size={48} />
              </div>
              <div className="text-center">
                <h3 className="text-xl font-black text-gray-900">Không tìm thấy sản phẩm</h3>
                <p className="text-gray-400 text-sm">Vui lòng thử lại với từ khóa khác hoặc bộ lọc khác.</p>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
              {parts.map((part: any) => (
                <PartCard 
                  key={part.id}
                  id={part.id}
                  name={part.name}
                  partNumber={part.partNumber}
                  price={Number(part.price)}
                  imageUrl={part.imageUrl}
                  isNew={true}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function FilterLink({ href, children, active }: { href: string; children: React.ReactNode; active?: boolean }) {
  return (
    <a 
      href={href} 
      className={`
        block px-4 py-2 rounded-xl text-sm font-bold transition-all
        ${active 
          ? 'bg-[#CC0000] text-white shadow-lg shadow-red-500/20 translate-x-2' 
          : 'text-gray-500 hover:text-[#CC0000] hover:bg-red-50 hover:translate-x-1'
        }
      `}
    >
      {children}
    </a>
  );
}
