import { useState } from 'react';
import { 
  useGetCategoriesQuery, 
  useCreateCategoryMutation, 
  useUpdateCategoryMutation, 
  useDeleteCategoryMutation 
} from '../store/api/categoryApiSlice';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '../components/ui/table';
import { Button } from '../components/ui/button';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogFooter 
} from '../components/ui/dialog';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Plus, Edit2, Trash2, Loader2, FolderOpen } from 'lucide-react';
import { toast } from 'react-hot-toast';

export const Categories = () => {
  const { data: categories, isLoading } = useGetCategoriesQuery();
  const [createCategory, { isLoading: isCreating }] = useCreateCategoryMutation();
  const [updateCategory, { isLoading: isUpdating }] = useUpdateCategoryMutation();
  const [deleteCategory] = useDeleteCategoryMutation();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<{ id: string, name: string, description: string } | null>(null);
  const [formData, setFormData] = useState({ name: '', description: '' });

  const handleOpenAdd = () => {
    setEditingCategory(null);
    setFormData({ name: '', description: '' });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (cat: any) => {
    setEditingCategory(cat);
    setFormData({ name: cat.name, description: cat.description || '' });
    setIsModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim()) {
      toast.error('Tên danh mục không được để trống');
      return;
    }

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
    <div className="space-y-6">
      <div className="flex justify-between items-center bg-white p-5 rounded-xl border border-gray-100 shadow-sm">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Danh mục phụ tùng</h1>
          <p className="text-sm text-gray-500">Quản lý các loại phụ tùng trong hệ thống</p>
        </div>
        <Button 
          onClick={handleOpenAdd} 
          className="bg-red-600 hover:bg-red-700 text-white gap-2 h-10 px-4 rounded-lg shadow-sm"
        >
          <Plus size={18} />
          Thêm danh mục
        </Button>
      </div>

      <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
        {isLoading ? (
          <div className="h-64 flex items-center justify-center">
            <Loader2 className="w-8 h-8 animate-spin text-red-600" />
          </div>
        ) : (
          <Table>
            <TableHeader className="bg-gray-50/50">
              <TableRow>
                <TableHead className="w-[100px] text-gray-400 font-semibold uppercase text-[11px] tracking-wider px-6">STT</TableHead>
                <TableHead className="text-gray-400 font-semibold uppercase text-[11px] tracking-wider">Tên danh mục</TableHead>
                <TableHead className="text-gray-400 font-semibold uppercase text-[11px] tracking-wider">Mô tả</TableHead>
                <TableHead className="text-right text-gray-400 font-semibold uppercase text-[11px] tracking-wider px-6">Thao tác</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {categories && categories.length > 0 ? (
                categories.map((cat, index) => (
                  <TableRow key={cat.id} className="hover:bg-gray-50/50 transition-colors">
                    <TableCell className="font-medium text-gray-600 px-6">{index + 1}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-red-50 flex items-center justify-center text-red-600">
                          <FolderOpen size={16} />
                        </div>
                        <span className="font-semibold text-gray-900">{cat.name}</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-gray-500">{cat.description || 'Chưa có mô tả'}</TableCell>
                    <TableCell className="text-right px-6">
                      <div className="flex justify-end gap-2">
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          onClick={() => handleOpenEdit(cat)}
                          className="text-blue-600 hover:bg-blue-50"
                        >
                          <Edit2 size={16} />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          onClick={() => handleDelete(cat.id)}
                          className="text-red-600 hover:bg-red-50"
                        >
                          <Trash2 size={16} />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={4} className="h-48 text-center text-gray-400">
                    Chưa có danh mục nào được tạo
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        )}
      </div>

      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="sm:max-w-[425px] rounded-2xl bg-white p-0 overflow-hidden border-none shadow-2xl">
          <form onSubmit={handleSubmit}>
            <DialogHeader className="p-6 pb-0">
              <DialogTitle className="text-xl font-bold text-gray-900">
                {editingCategory ? 'Chỉnh sửa danh mục' : 'Thêm danh mục mới'}
              </DialogTitle>
            </DialogHeader>
            <div className="p-6 space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-sm font-semibold text-gray-700">Tên danh mục <span className="text-red-500">*</span></Label>
                <Input 
                  id="name" 
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="VD: Phụ tùng động cơ"
                  className="rounded-lg border-gray-200 focus:ring-red-600/20 focus:border-red-600"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="description" className="text-sm font-semibold text-gray-700">Mô tả</Label>
                <Input 
                  id="description" 
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Nhập mô tả ngắn gọn..."
                  className="rounded-lg border-gray-200 focus:ring-red-600/20 focus:border-red-600"
                />
              </div>
            </div>
            <DialogFooter className="p-6 pt-0 bg-gray-50/50 flex flex-row gap-3">
              <Button 
                type="button" 
                variant="outline" 
                onClick={() => setIsModalOpen(false)}
                className="flex-1 rounded-lg border-gray-200 text-gray-700 hover:bg-white"
              >
                Hủy
              </Button>
              <Button 
                type="submit" 
                disabled={isCreating || isUpdating}
                className="flex-1 rounded-lg bg-red-600 hover:bg-red-700 text-white shadow-md shadow-red-600/20"
              >
                {(isCreating || isUpdating) ? <Loader2 className="animate-spin" /> : 'Lưu danh mục'}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};
