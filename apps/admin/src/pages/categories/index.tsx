import { useState } from 'react';
import { 
  useGetCategoriesQuery, 
  useCreateCategoryMutation, 
  useUpdateCategoryMutation, 
  useDeleteCategoryMutation 
} from '../../store/api/categoryApiSlice';
import { Loader2 } from 'lucide-react';
import { toast } from 'react-hot-toast';
import { CategoryTable } from '../../components/Categories/CategoryTable';
import { CategoryFormModal } from '../../components/Categories/CategoryFormModal';
import { PageHeader } from '../../components/PageHeader';
import { Pagination } from '../../components/Pagination';

export const Categories = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;

  const { data: categoriesData, isLoading } = useGetCategoriesQuery({
    page: currentPage,
    limit: pageSize
  });

  const [createCategory, { isLoading: isCreating }] = useCreateCategoryMutation();
  const [updateCategory, { isLoading: isUpdating }] = useUpdateCategoryMutation();
  const [deleteCategory] = useDeleteCategoryMutation();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<any>(null);

  const handleOpenAdd = () => {
    setEditingCategory(null);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (cat: any) => {
    setEditingCategory(cat);
    setIsModalOpen(true);
  };

  const handleSubmit = async (formData: { name: string; description: string }) => {
    try {
      if (editingCategory) {
        await updateCategory({ id: editingCategory.id, body: formData }).unwrap();
        toast.success('Cập nhật danh mục thành công');
      } else {
        await createCategory(formData).unwrap();
        toast.success('Thêm danh mục mới thành công');
      }
      setIsModalOpen(false);
    } catch (err) {
      toast.error('Có lỗi xảy ra, vui lòng thử lại');
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa danh mục này?')) {
      try {
        await deleteCategory(id).unwrap();
        toast.success('Xóa danh mục thành công');
      } catch (err) {
        toast.error('Không thể xóa danh mục này');
      }
    }
  };

  return (
    <div className="space-y-6 pb-12">
      <PageHeader 
        title="Danh mục phụ tùng"
        subtitle="Quản lý các loại phụ tùng trong hệ thống"
        actionButtonText="Thêm danh mục"
        onActionClick={handleOpenAdd}
      />

      <div className="bg-white rounded-[2rem] border border-gray-100 shadow-sm overflow-hidden">
        {isLoading ? (
          <div className="h-64 flex items-center justify-center">
            <Loader2 className="w-8 h-8 animate-spin text-honda-red" />
          </div>
        ) : (
          <CategoryTable 
            categories={categoriesData?.items || []} 
            onEdit={handleOpenEdit} 
            onDelete={handleDelete} 
          />
        )}
      </div>

      {categoriesData && (
        <Pagination 
          currentPage={currentPage}
          totalPages={categoriesData.totalPages}
          onPageChange={setCurrentPage}
          totalItems={categoriesData.total}
          pageSize={pageSize}
        />
      )}

      <CategoryFormModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        editingCategory={editingCategory} 
        onSubmit={handleSubmit} 
        isLoading={isCreating || isUpdating} 
      />
    </div>
  );
};
