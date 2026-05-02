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
import { Pagination } from '../../components/Pagination';
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

  const { data: categoriesData } = useGetCategoriesQuery();
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
              {categoriesData?.items?.map(cat => (
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

      {partsData && (
        <Pagination 
          currentPage={currentPage}
          totalPages={partsData.totalPages}
          onPageChange={setCurrentPage}
          totalItems={partsData.total}
          pageSize={pageSize}
        />
      )}

      <PartFormModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        editingPart={editingPart}
        categories={categoriesData?.items || []}
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
