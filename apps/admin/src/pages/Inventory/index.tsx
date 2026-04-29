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
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '../../components/ui/select';
import { toast } from 'react-hot-toast';

export const Inventory = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingPart, setEditingPart] = useState<any>(null);

  const { data: categories } = useGetCategoriesQuery();
  const { data: parts, isLoading } = useGetPartsQuery({ 
    categoryId: selectedCategory === 'all' ? undefined : selectedCategory,
    query: searchTerm || undefined
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

  return (
    <div className="space-y-6">
      <PageHeader 
        title="Kho phụ tùng"
        subtitle="Quản lý kho và danh mục phụ tùng Honda"
        searchValue={searchTerm}
        onSearchChange={setSearchTerm}
        searchPlaceholder="Tìm theo mã, tên..."
        actionButtonText="Thêm phụ tùng"
        onActionClick={handleOpenAdd}
        extraFilter={
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
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
        parts={parts || []}
        isLoading={isLoading}
        onEdit={handleOpenEdit}
        onDelete={handleDelete}
      />

      <PartFormModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        editingPart={editingPart}
        categories={categories || []}
        onSubmit={handleFormSubmit}
        isLoading={isCreating || isUpdating}
      />
    </div>
  );
};
