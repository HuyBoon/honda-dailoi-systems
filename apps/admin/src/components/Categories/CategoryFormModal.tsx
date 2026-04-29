import { useEffect, useState } from 'react';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogFooter 
} from '../ui/dialog';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Loader2 } from 'lucide-react';
import { toast } from 'react-hot-toast';

interface CategoryFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  editingCategory: any;
  onSubmit: (data: { name: string; description: string }) => Promise<void>;
  isLoading: boolean;
}

export const CategoryFormModal = ({ 
  isOpen, 
  onClose, 
  editingCategory, 
  onSubmit, 
  isLoading 
}: CategoryFormModalProps) => {
  const [formData, setFormData] = useState({ name: '', description: '' });

  useEffect(() => {
    if (editingCategory) {
      setFormData({ name: editingCategory.name, description: editingCategory.description || '' });
    } else {
      setFormData({ name: '', description: '' });
    }
  }, [editingCategory, isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim()) {
      toast.error('Tên danh mục không được để trống');
      return;
    }
    await onSubmit(formData);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
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
              onClick={onClose}
              className="flex-1 rounded-lg border-gray-200 text-gray-700 hover:bg-white"
            >
              Hủy
            </Button>
            <Button 
              type="submit" 
              disabled={isLoading}
              className="flex-1 rounded-lg bg-red-600 hover:bg-red-700 text-white shadow-md shadow-red-600/20"
            >
              {isLoading ? <Loader2 className="animate-spin" /> : 'Lưu danh mục'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
