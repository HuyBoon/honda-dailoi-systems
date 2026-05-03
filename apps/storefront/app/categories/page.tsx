import { getCategories } from '@/lib/api';
import Link from 'next/link';
import { ArrowRight, Box, Search } from 'lucide-react';
import PageHeader from '@/components/PageHeader';
import Pagination from '@/components/Pagination';

export default async function CategoriesPage(props: {
  searchParams: Promise<{ page?: string }>;
}) {
  const searchParams = await props.searchParams;
  const currentPage = Number(searchParams.page) || 1;
  const pageSize = 12;

  const categoriesData = await getCategories({ page: currentPage, limit: pageSize });
  const categories = categoriesData.items || [];

  return (
    <div className="min-h-screen bg-[#FDFDFD]">
      <PageHeader 
        title={<>Hệ thống <br /> <span className="text-[#CC0000]">Danh mục.</span></>}
        subtitle="Phân loại linh kiện"
        breadcrumbs={[
          { label: 'Danh mục' }
        ]}
        image="https://images.unsplash.com/photo-1581235720704-06d3acfcba80?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80"
      />

      <div className="container mx-auto px-4 lg:px-8 -mt-8 relative z-20 pb-32">
        <div className="space-y-12">
          {/* Top Bar / Search */}
          <div className="bg-white p-4 lg:p-6 rounded-[40px] border border-gray-100 shadow-sm flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="relative w-full md:max-w-md group">
              <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#CC0000] transition-colors" size={20} />
              <input 
                type="text" 
                placeholder="Tìm nhanh danh mục..."
                className="w-full pl-16 pr-6 py-4 bg-gray-50 border-none rounded-[28px] text-sm font-medium focus:ring-4 focus:ring-[#CC0000]/10 outline-none transition-all"
              />
            </div>
            <div className="text-sm font-bold text-gray-400 uppercase tracking-widest px-4">
              Tổng số <span className="text-gray-900">{categoriesData.total}</span> danh mục
            </div>
          </div>

          {/* Categories Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {categories.map((category: any, idx: number) => (
              <Link 
                key={category.id} 
                href={`/parts?categoryId=${category.id}`}
                className="group relative h-[450px] rounded-[50px] overflow-hidden bg-white border border-gray-100 shadow-sm hover:shadow-2xl transition-all duration-700"
              >
                {/* Visual Background */}
                <div className="absolute inset-0 z-0">
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent z-10" />
                  <img 
                    src={`https://images.unsplash.com/photo-1581235720704-06d3acfcba80?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80&sig=${idx}`} 
                    alt={category.name}
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 opacity-70 grayscale group-hover:grayscale-0"
                  />
                </div>

                <div className="absolute inset-0 z-20 p-12 flex flex-col justify-end space-y-6">
                  <div className="w-16 h-16 bg-[#CC0000] rounded-[2rem] flex items-center justify-center text-white shadow-2xl shadow-red-500/40 transform group-hover:rotate-12 transition-all duration-500">
                    <Box size={32} />
                  </div>
                  
                  <div className="space-y-2 translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                    <h3 className="text-4xl font-black text-white uppercase tracking-tighter leading-[0.9]">
                      {category.name}
                    </h3>
                    <div className="flex items-center gap-2 text-white/50 text-[10px] font-black uppercase tracking-[0.3em]">
                      <div className="w-6 h-[1px] bg-white/30" />
                      Explore Collection
                    </div>
                  </div>

                  {/* Call to action */}
                  <div className="pt-6 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                    <div className="inline-flex items-center gap-3 px-6 py-3 bg-white text-black rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-[#CC0000] hover:text-white transition-all shadow-xl">
                      Xem sản phẩm <ArrowRight size={14} />
                    </div>
                  </div>
                </div>

                {/* Decorative border on hover */}
                <div className="absolute inset-4 border-2 border-white/0 group-hover:border-white/10 rounded-[40px] transition-all duration-700 pointer-events-none" />
              </Link>
            ))}
          </div>

          {/* Pagination */}
          <Pagination 
            currentPage={currentPage}
            totalPages={categoriesData.totalPages}
            searchParams={searchParams}
            baseUrl="/categories"
          />

          {/* Newsletter / CTA */}
          <div className="bg-gray-900 rounded-[4rem] p-16 text-center space-y-8 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10" />
            <div className="relative z-10 space-y-4">
              <h2 className="text-4xl font-black text-white uppercase tracking-tighter">Tra cứu danh mục nhanh?</h2>
              <p className="text-gray-400 max-w-xl mx-auto font-medium">Nhập mã phụ tùng hoặc tên linh kiện để chúng tôi gợi ý danh mục phù hợp nhất cho bạn.</p>
            </div>
            <div className="relative z-10 max-w-lg mx-auto flex gap-4">
              <input 
                type="text" 
                placeholder="Nhập tên phụ tùng..."
                className="flex-1 px-8 py-5 bg-white/5 border border-white/10 rounded-2xl text-white outline-none focus:border-[#CC0000] transition-colors"
              />
              <button className="px-10 py-5 bg-[#CC0000] text-white font-black rounded-2xl uppercase text-[10px] tracking-widest hover:bg-red-700 transition-colors shadow-xl shadow-red-500/20">
                Tìm ngay
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
