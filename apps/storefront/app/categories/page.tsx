import { getCategories } from '@/lib/api';
import Link from 'next/link';
import { ArrowRight, Box } from 'lucide-react';

export default async function CategoriesPage() {
  const categoriesData = await getCategories({ limit: 100 });
  const categories = categoriesData.items;

  return (
    <div className="container mx-auto px-4 lg:px-8 py-16">
      <div className="max-w-2xl mb-16">
        <h1 className="text-5xl font-black text-gray-900 tracking-tighter uppercase mb-4">
          Danh mục <span className="text-[#CC0000]">sản phẩm</span>
        </h1>
        <p className="text-lg text-gray-500 font-medium">
          Dễ dàng tìm kiếm phụ tùng bạn cần bằng cách duyệt qua hệ thống danh mục được phân loại khoa học của chúng tôi.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {categories.map((category: any) => (
          <Link 
            key={category.id} 
            href={`/parts?categoryId=${category.id}`}
            className="group relative h-[300px] rounded-[40px] overflow-hidden bg-white border border-gray-100 shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-500"
          >
            {/* Visual Background */}
            <div className="absolute inset-0 z-0">
               <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent z-10" />
               <img 
                 src="https://images.unsplash.com/photo-1558981285-6f0c94958bb6?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" 
                 alt={category.name}
                 className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-60"
               />
            </div>

            <div className="absolute bottom-10 left-10 right-10 z-20 space-y-3">
              <div className="w-12 h-12 bg-[#CC0000] rounded-2xl flex items-center justify-center text-white shadow-xl shadow-red-500/20 group-hover:rotate-12 transition-transform">
                <Box size={24} />
              </div>
              <div>
                <h3 className="text-2xl font-black text-white uppercase tracking-tight group-hover:text-[#CC0000] transition-colors">
                  {category.name}
                </h3>
                <p className="text-gray-400 text-sm font-bold uppercase tracking-widest mt-1">
                  Khám phá phụ tùng <ArrowRight className="inline-block ml-1 group-hover:translate-x-2 transition-transform" size={14} />
                </p>
              </div>
            </div>

            {/* Hover Indicator */}
            <div className="absolute top-8 right-8 w-12 h-12 rounded-full border border-white/20 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity">
              <ArrowRight size={20} />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
