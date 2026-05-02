import { Search, ArrowUpDown, LayoutGrid, List } from 'lucide-react';

interface PartsToolbarProps {
  query?: string;
  total: number;
}

export default function PartsToolbar({ query, total }: PartsToolbarProps) {
  return (
    <div className="space-y-8">
      <div className="bg-white p-4 lg:p-6 rounded-[40px] border border-gray-100 shadow-sm flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="relative w-full md:max-w-md group">
          <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#CC0000] transition-colors" size={20} />
          <form action="/parts" method="GET">
            <input 
              type="text" 
              name="query"
              placeholder="Tìm kiếm theo tên, mã sản phẩm..."
              defaultValue={query || ''}
              className="w-full pl-16 pr-6 py-4 bg-gray-50 border-none rounded-[28px] text-sm font-medium focus:ring-4 focus:ring-[#CC0000]/10 outline-none transition-all"
            />
          </form>
        </div>
        
        <div className="flex items-center gap-4 w-full md:w-auto">
          <div className="flex items-center gap-2 px-6 py-4 bg-gray-50 rounded-[28px] border-none text-[10px] font-black uppercase tracking-widest text-gray-500">
            <ArrowUpDown size={14} /> Sắp xếp:
            <select className="bg-transparent border-none focus:ring-0 cursor-pointer text-gray-900">
              <option>Mới nhất</option>
              <option>Giá thấp</option>
              <option>Giá cao</option>
            </select>
          </div>
          <div className="flex gap-1 p-1 bg-gray-50 rounded-2xl border-none">
            <button className="p-3 bg-white text-black shadow-sm rounded-xl"><LayoutGrid size={16} /></button>
            <button className="p-3 text-gray-400 hover:text-black transition-colors"><List size={16} /></button>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between px-4">
        <p className="text-sm font-bold text-gray-400 uppercase tracking-widest">
          Tìm thấy <span className="text-gray-900">{total}</span> sản phẩm
        </p>
      </div>
    </div>
  );
}
