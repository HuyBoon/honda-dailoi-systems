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
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '../ui/select';
import { Loader2 } from 'lucide-react';
import { User, Role } from '../../store/api/userApiSlice';
import { toast } from 'react-hot-toast';

interface UserFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  editingUser: User | null;
  onSubmit: (data: Partial<User>) => Promise<void>;
  isLoading: boolean;
}

export const UserFormModal = ({ 
  isOpen, 
  onClose, 
  editingUser, 
  onSubmit, 
  isLoading 
}: UserFormModalProps) => {
  const [formData, setFormData] = useState({ 
    email: '', 
    role: Role.USER as Role,
    password: ''
  });

  useEffect(() => {
    if (editingUser) {
      setFormData({ 
        email: editingUser.email, 
        role: editingUser.role,
        password: ''
      });
    } else {
      setFormData({ email: '', role: Role.USER, password: '' });
    }
  }, [editingUser, isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.email) {
      toast.error('Email không được để trống');
      return;
    }
    
    // Only send password if it's provided (for update) or required (for create - though we use registration for create usually)
    const submitData: any = { email: formData.email, role: formData.role };
    if (formData.password) submitData.password = formData.password;
    
    await onSubmit(submitData);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px] rounded-2xl bg-white p-0 overflow-hidden border-none shadow-2xl">
        <form onSubmit={handleSubmit}>
          <DialogHeader className="p-6 pb-0">
            <DialogTitle className="text-xl font-bold text-gray-900">
              {editingUser ? 'Chỉnh sửa nhân viên' : 'Thêm nhân viên mới'}
            </DialogTitle>
          </DialogHeader>
          <div className="p-6 space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm font-semibold text-gray-700">Email <span className="text-red-500">*</span></Label>
              <Input 
                id="email" 
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="nhanvien@hondadailoi.vn"
                className="rounded-lg border-gray-200 focus:ring-honda-red/20 focus:border-honda-red"
                disabled={!!editingUser}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="role" className="text-sm font-semibold text-gray-700">Vai trò <span className="text-red-500">*</span></Label>
              <Select 
                value={formData.role} 
                onValueChange={(val: Role) => setFormData({ ...formData, role: val })}
              >
                <SelectTrigger className="rounded-lg border-gray-200">
                  <SelectValue placeholder="Chọn vai trò" />
                </SelectTrigger>
                <SelectContent className="bg-white border-gray-100">
                  <SelectItem value={Role.USER}>Staff (Nhân viên)</SelectItem>
                  <SelectItem value={Role.MANAGER}>Manager (Quản lý)</SelectItem>
                  <SelectItem value={Role.ADMIN}>Admin (Quản trị viên)</SelectItem>
                  {formData.role === Role.SUPER_ADMIN && (
                    <SelectItem value={Role.SUPER_ADMIN}>Super Admin</SelectItem>
                  )}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-sm font-semibold text-gray-700">
                {editingUser ? 'Mật khẩu mới (Để trống nếu không đổi)' : 'Mật khẩu *'}
              </Label>
              <Input 
                id="password" 
                type="password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                placeholder="••••••••"
                className="rounded-lg border-gray-200 focus:ring-honda-red/20 focus:border-honda-red"
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
              className="flex-1 rounded-lg bg-honda-red hover:bg-red-700 text-white shadow-md shadow-honda-red/20"
            >
              {isLoading ? <Loader2 className="animate-spin" /> : 'Lưu thông tin'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
