import { useState } from 'react';
import { 
  useGetPartsQuery, 
  useCreatePartMutation, 
  useUpdatePartMutation, 
  useDeletePartMutation 
} from '../../store/api/partApiSlice';
import { useGetCategoriesQuery } from '../../store/api/categoryApiSlice';
import { PageHeader } from '../../components/PageHeader';
import { InventoryTable } from '../../components/Inventory/InventoryTable';
import { PartFormModal } from '../../components/Inventory/PartFormModal';
import { PartHistoryModal } from '../../components/Inventory/PartHistoryModal';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '../../components/ui/select';
import { Button } from '../../components/ui/button';
import { toast } from 'react-hot-toast';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export const Inventory = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);
  const [editingPart, setEditingPart] = useState<any>(null);
  const [viewingHistoryPart, setViewingHistoryPart] = useState<any>(null);

  const { data: categories } = useGetCategoriesQuery();
  const { data: partsData, isLoading } = useGetPartsQuery({ 
    categoryId: selectedCategory === 'all' ? undefined : selectedCategory,
    q: searchTerm || undefined,
    page: currentPage,
    limit: pageSize
  });

  const [createPart, { isLoading: isCreating }] = useCreatePartMutation();
  const [updatePart, { isLoading: isUpdating }] = useUpdatePartMutation();
  const [deletePart] = useDeletePartMutation();

  const handleOpenAdd = () => {
    setEditingPart(null);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (part: any) => {
    setEditingPart(part);
    setIsModalOpen(true);
  };

  const handleViewHistory = (part: any) => {
    setViewingHistoryPart(part);
    setIsHistoryOpen(true);
  };

  const handleFormSubmit = async (formData: any) => {
    try {
      if (editingPart) {
        await updatePart({ id: editingPart.id, body: formData }).unwrap();
        toast.success('Cập nhật phụ tùng thành công');
      } else {
        await createPart(formData).unwrap();
        toast.success('Thêm phụ tùng mới thành công');
      }
      setIsModalOpen(false);
    } catch (err) {
      toast.error('Có lỗi xảy ra khi lưu phụ tùng');
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa phụ tùng này?')) {
      try {
        await deletePart(id).unwrap();
        toast.success('Xóa phụ tùng thành công');
      } catch (err) {
        toast.error('Không thể xóa phụ tùng này');
      }
    }
  };

  const handleSearchChange = (val: string) => {
    setSearchTerm(val);
    setCurrentPage(1); // Reset to first page on search
  };

  const handleCategoryChange = (val: string) => {
    setSelectedCategory(val);
    setCurrentPage(1); // Reset to first page on category change
  };

  return (
    <div className="space-y-6 pb-12">
      <PageHeader 
        title="Kho phụ tùng"
        subtitle="Quản lý kho và danh mục phụ tùng Honda"
        searchValue={searchTerm}
        onSearchChange={handleSearchChange}
        searchPlaceholder="Tìm theo mã, tên..."
        actionButtonText="Thêm phụ tùng"
        onActionClick={handleOpenAdd}
        extraFilter={
          <Select value={selectedCategory} onValueChange={handleCategoryChange}>
            <SelectTrigger className="w-full sm:w-48 rounded-lg border-gray-200 focus:ring-honda-red/20 focus:border-honda-red transition-all">
              <SelectValue placeholder="Tất cả danh mục" />
            </SelectTrigger>
            <SelectContent className="bg-white border-gray-100 shadow-xl">
              <SelectItem value="all">Tất cả danh mục</SelectItem>
              {categories?.map(cat => (
                <SelectItem key={cat.id} value={cat.id}>{cat.name}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        }
      />

      <InventoryTable 
        parts={partsData?.items || []}
        isLoading={isLoading}
        onEdit={handleOpenEdit}
        onDelete={handleDelete}
        onViewHistory={handleViewHistory}
      />

      {/* Pagination UI */}
      {partsData && partsData.totalPages > 1 && (
        <div className="flex items-center justify-between bg-white px-6 py-4 rounded-2xl border border-gray-100 shadow-sm">
          <div className="flex-1 flex justify-between sm:hidden">
            <Button
              variant="outline"
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
            >
              Previous
            </Button>
            <Button
              variant="outline"
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, partsData.totalPages))}
              disabled={currentPage === partsData.totalPages}
            >
              Next
            </Button>
          </div>
          <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
            <div>
              <p className="text-sm text-gray-500">
                Hiển thị <span className="font-bold text-gray-900">{(currentPage - 1) * pageSize + 1}</span> đến{' '}
                <span className="font-bold text-gray-900">
                  {Math.min(currentPage * pageSize, partsData.total)}
                </span>{' '}
                trong tổng số <span className="font-bold text-gray-900">{partsData.total}</span> phụ tùng
              </p>
            </div>
            <div>
              <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                <Button
                  variant="outline"
                  className="rounded-l-xl rounded-r-none px-3"
                  onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                
                {[...Array(partsData.totalPages)].map((_, i) => (
                  <Button
                    key={i + 1}
                    variant={currentPage === i + 1 ? "default" : "outline"}
                    className={`rounded-none px-4 ${currentPage === i + 1 ? 'bg-honda-red border-honda-red' : ''}`}
                    onClick={() => setCurrentPage(i + 1)}
                  >
                    {i + 1}
                  </Button>
                ))}

                <Button
                  variant="outline"
                  className="rounded-r-xl rounded-l-none px-3"
                  onClick={() => setCurrentPage(prev => Math.min(prev + 1, partsData.totalPages))}
                  disabled={currentPage === partsData.totalPages}
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </nav>
            </div>
          </div>
        </div>
      )}

      <PartFormModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        editingPart={editingPart}
        categories={categories || []}
        onSubmit={handleFormSubmit}
        isLoading={isCreating || isUpdating}
      />

      <PartHistoryModal 
        isOpen={isHistoryOpen}
        onClose={() => setIsHistoryOpen(false)}
        part={viewingHistoryPart}
      />
    </div>
  );
};
