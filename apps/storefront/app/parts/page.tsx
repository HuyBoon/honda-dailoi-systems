import { getParts, getCategories, getVehicles } from '@/lib/api';
import PartCard from '@/components/PartCard';
import PageHeader from '@/components/PageHeader';
import PartsSidebar from '@/components/Parts/PartsSidebar';
import PartsToolbar from '@/components/Parts/PartsToolbar';
import Pagination from '@/components/Pagination';
import { Search } from 'lucide-react';
import Link from 'next/link';

export default async function PartsPage(props: {
  searchParams: Promise<{ query?: string; categoryId?: string; vehicleId?: string; page?: string; sort?: string }>;
}) {
  const searchParams = await props.searchParams;
  const currentPage = Number(searchParams.page) || 1;
  const pageSize = 12;
  
  const [partsData, categoriesData, vehiclesData] = await Promise.all([
    getParts({ ...searchParams, page: currentPage, limit: pageSize }),
    getCategories({ limit: 100 }), 
    getVehicles({ limit: 100 }),
  ]);

  const parts = partsData.items || [];
  const categories = categoriesData.items || [];
  const vehicles = vehiclesData.items || [];

  return (
    <div className="min-h-screen bg-[#FDFDFD]">
      <PageHeader 
        title={<>Hệ thống <span className="text-[#CC0000]">Phụ tùng</span> <br /> Chính hãng.</>}
        subtitle="Trung tâm phụ tùng"
        breadcrumbs={[
          { label: 'Phụ tùng' }
        ]}
      />

      <div className="container mx-auto px-4 lg:px-8 -mt-8 relative z-20 pb-32">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* SIDEBAR FILTERS */}
          <PartsSidebar 
            categories={categories}
            vehicles={vehicles}
            searchParams={searchParams}
          />

          {/* MAIN CONTENT */}
          <div className="flex-1 space-y-8">
            {/* Toolbar */}
            <PartsToolbar 
              query={searchParams.query}
              total={partsData.total}
            />

            {/* Results Grid */}
            {parts.length === 0 ? (
              <div className="bg-white rounded-[4rem] border border-gray-100 border-dashed py-32 flex flex-col items-center justify-center space-y-6">
                <div className="w-24 h-24 bg-gray-50 rounded-full flex items-center justify-center text-gray-200">
                  <Search size={48} />
                </div>
                <div className="text-center space-y-2">
                  <h3 className="text-2xl font-black text-gray-900 uppercase">Không tìm thấy kết quả</h3>
                  <p className="text-gray-400 text-sm font-medium">Thử thay đổi bộ lọc hoặc từ khóa tìm kiếm khác.</p>
                </div>
                <Link href="/parts" className="px-10 py-4 bg-black text-white rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-[#CC0000] transition-all">Xóa tất cả bộ lọc</Link>
              </div>
            ) : (
              <div className="space-y-16">
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8">
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

                {/* Pagination */}
                <Pagination 
                  currentPage={currentPage}
                  totalPages={partsData.totalPages}
                  searchParams={searchParams}
                  baseUrl="/parts"
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
