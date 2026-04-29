import { useState } from 'react';
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
import { Search, Loader2 } from 'lucide-react';
import { TransactionType } from '../../store/api/transactionApiSlice';
import { toast } from 'react-hot-toast';

interface TransactionFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  parts: any[];
  onSubmit: (data: any) => Promise<void>;
  isLoading: boolean;
}

export const TransactionFormModal = ({ 
  isOpen, 
  onClose, 
  parts, 
  onSubmit, 
  isLoading 
}: TransactionFormModalProps) => {
  const [formData, setFormData] = useState({
    partId: '',
    type: TransactionType.IMPORT,
    quantity: 1,
    notes: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.partId || formData.quantity < 1) {
      toast.error('Vui lòng chọn phụ tùng và nhập số lượng hợp lệ');
      return;
    }
    await onSubmit(formData);
    setFormData({ partId: '', type: TransactionType.IMPORT, quantity: 1, notes: '' });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[450px] rounded-2xl bg-white p-0 overflow-hidden border-none shadow-2xl">
        <form onSubmit={handleSubmit}>
          <DialogHeader className="p-6 pb-2">
            <DialogTitle className="text-xl font-bold text-gray-900">Tạo phiếu kho mới</DialogTitle>
          </DialogHeader>
          <div className="p-6 space-y-5">
            <div className="space-y-2">
              <Label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Phụ tùng *</Label>
              <Select 
                value={formData.partId} 
                onValueChange={(val) => setFormData({...formData, partId: val})}
              >
                <SelectTrigger className="rounded-lg border-gray-200">
                  <SelectValue placeholder="Chọn phụ tùng cần giao dịch" />
                </SelectTrigger>
                <SelectContent className="bg-white border-gray-100 max-h-[300px]">
                  <div className="p-2 sticky top-0 bg-white z-10 border-b border-gray-100 mb-1">
                    <div className="relative">
                      <Search className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-400" size={14} />
                      <Input className="h-8 pl-8 text-xs border-none bg-gray-50" placeholder="Tìm phụ tùng..." />
                    </div>
                  </div>
                  {parts?.map(part => (
                    <SelectItem key={part.id} value={part.id} className="cursor-pointer">
                      <div className="flex flex-col">
                        <span className="font-semibold text-sm">{part.name}</span>
                        <span className="text-[10px] text-gray-400">{part.partNumber} • Còn: {part.stockQuantity}</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Loại giao dịch *</Label>
                <Select 
                  value={formData.type} 
                  onValueChange={(val: TransactionType) => setFormData({...formData, type: val})}
                >
                  <SelectTrigger className="rounded-lg border-gray-200">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-white border-gray-100">
                    <SelectItem value={TransactionType.IMPORT}>Nhập kho</SelectItem>
                    <SelectItem value={TransactionType.EXPORT}>Xuất kho</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Số lượng *</Label>
                <Input 
                  type="number"
                  min={1}
                  value={formData.quantity}
                  onChange={(e) => setFormData({...formData, quantity: parseInt(e.target.value) || 1})}
                  className="rounded-lg border-gray-200 focus:ring-red-600/20 focus:border-red-600 font-bold"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Ghi chú</Label>
              <Input 
                placeholder="VD: Nhập thêm từ Honda VN..." 
                value={formData.notes}
                onChange={(e) => setFormData({...formData, notes: e.target.value})}
                className="rounded-lg border-gray-200 focus:ring-red-600/20 focus:border-red-600"
              />
            </div>
          </div>
          <DialogFooter className="p-6 bg-gray-50/50 border-t border-gray-100 flex flex-row gap-3">
            <Button type="button" variant="ghost" onClick={onClose} className="flex-1 rounded-lg text-gray-600 hover:bg-gray-100 h-11">
              Hủy
            </Button>
            <Button type="submit" disabled={isLoading} className="flex-1 bg-red-600 hover:bg-red-700 text-white rounded-lg shadow-md shadow-red-600/20 h-11 font-bold">
              {isLoading ? <Loader2 className="animate-spin" /> : 'Ghi nhận giao dịch'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
