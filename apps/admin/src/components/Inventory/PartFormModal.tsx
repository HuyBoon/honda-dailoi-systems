import { useState, useEffect } from 'react';
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
import { toast } from 'react-hot-toast';

import { useGetVehiclesQuery } from '../../store/api/vehicleApiSlice';

interface PartFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  editingPart: any;
  categories: any[];
  onSubmit: (data: any) => Promise<void>;
  isLoading: boolean;
}

export const PartFormModal = ({
  isOpen,
  onClose,
  editingPart,
  categories,
  onSubmit,
  isLoading
}: PartFormModalProps) => {
  const { data: vehicles } = useGetVehiclesQuery();
  const [formData, setFormData] = useState({
    partNumber: '',
    name: '',
    description: '',
    price: 0,
    stockQuantity: 0,
    minStockLevel: 5,
    categoryId: '',
    vehicleIds: [] as string[]
  });

  useEffect(() => {
    if (editingPart) {
      setFormData({
        partNumber: editingPart.partNumber,
        name: editingPart.name,
        description: editingPart.description || '',
        price: Number(editingPart.price),
        stockQuantity: editingPart.stockQuantity,
        minStockLevel: editingPart.minStockLevel,
        categoryId: editingPart.categoryId,
        vehicleIds: editingPart.vehicles?.map((v: any) => v.id) || []
      });
    } else {
      setFormData({
        partNumber: '',
        name: '',
        description: '',
        price: 0,
        stockQuantity: 0,
        minStockLevel: 5,
        categoryId: categories?.[0]?.id || '',
        vehicleIds: []
      });
    }
  }, [editingPart, categories, isOpen]);

  const toggleVehicle = (id: string) => {
    setFormData(prev => {
      const isSelected = prev.vehicleIds.includes(id);
      if (isSelected) {
        return { ...prev, vehicleIds: prev.vehicleIds.filter(vId => vId !== id) };
      } else {
        return { ...prev, vehicleIds: [...prev.vehicleIds, id] };
      }
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.partNumber || !formData.categoryId) {
      toast.error('Vui lòng điền đầy đủ các thông tin bắt buộc');
      return;
    }
    await onSubmit(formData);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px] rounded-2xl bg-white p-0 overflow-hidden border-none shadow-2xl">
        <form onSubmit={handleSubmit}>
          <DialogHeader className="p-6 pb-2">
            <DialogTitle className="text-xl font-bold text-gray-900">
              {editingPart ? 'Cập nhật phụ tùng' : 'Thêm phụ tùng mới'}
            </DialogTitle>
          </DialogHeader>
          
          <div className="p-6 space-y-4 max-h-[60vh] overflow-y-auto custom-scrollbar">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Mã phụ tùng *</Label>
                <Input 
                  placeholder="VD: 12345-ABC-000" 
                  value={formData.partNumber}
                  onChange={e => setFormData({...formData, partNumber: e.target.value})}
                  className="rounded-lg border-gray-200 focus:ring-honda-red/20 focus:border-honda-red font-mono"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Danh mục *</Label>
                <Select 
                  value={formData.categoryId} 
                  onValueChange={val => setFormData({...formData, categoryId: val})}
                >
                  <SelectTrigger className="rounded-lg border-gray-200">
                    <SelectValue placeholder="Chọn danh mục" />
                  </SelectTrigger>
                  <SelectContent className="bg-white border-gray-100">
                    {categories?.map(cat => (
                      <SelectItem key={cat.id} value={cat.id}>{cat.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Tên phụ tùng *</Label>
              <Input 
                placeholder="VD: Bugi NGK AirBlade" 
                value={formData.name}
                onChange={e => setFormData({...formData, name: e.target.value})}
                className="rounded-lg border-gray-200 focus:ring-honda-red/20 focus:border-honda-red"
              />
            </div>

            <div className="space-y-2">
              <Label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Mô tả</Label>
              <Input 
                placeholder="Nhập mô tả..." 
                value={formData.description}
                onChange={e => setFormData({...formData, description: e.target.value})}
                className="rounded-lg border-gray-200 focus:ring-honda-red/20 focus:border-honda-red"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Đơn giá (VND)</Label>
                <Input 
                  type="number"
                  value={formData.price}
                  onChange={e => setFormData({...formData, price: Number(e.target.value)})}
                  className="rounded-lg border-gray-200 focus:ring-honda-red/20 focus:border-honda-red font-bold"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Số lượng tồn</Label>
                <Input 
                  type="number"
                  value={formData.stockQuantity}
                  onChange={e => setFormData({...formData, stockQuantity: Number(e.target.value)})}
                  className="rounded-lg border-gray-200 focus:ring-honda-red/20 focus:border-honda-red"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Mức tồn kho tối thiểu</Label>
                <Input 
                  type="number"
                  value={formData.minStockLevel}
                  onChange={e => setFormData({...formData, minStockLevel: Number(e.target.value)})}
                  className="rounded-lg border-gray-200 focus:ring-honda-red/20 focus:border-honda-red"
                />
              </div>
            </div>

            <div className="space-y-3 pt-2">
              <Label className="text-xs font-bold text-gray-500 uppercase tracking-wider block border-b border-gray-100 pb-2 mb-3">Dòng xe tương thích</Label>
              <div className="grid grid-cols-2 gap-2 max-h-[200px] overflow-y-auto pr-2 custom-scrollbar">
                {vehicles?.map((vehicle) => (
                  <label 
                    key={vehicle.id} 
                    className={`flex items-center gap-2 p-2 rounded-lg border cursor-pointer transition-all ${
                      formData.vehicleIds.includes(vehicle.id) 
                      ? 'border-honda-red bg-red-50 text-honda-red font-semibold' 
                      : 'border-gray-100 hover:border-gray-200 text-gray-600'
                    }`}
                  >
                    <input 
                      type="checkbox" 
                      className="hidden"
                      checked={formData.vehicleIds.includes(vehicle.id)}
                      onChange={() => toggleVehicle(vehicle.id)}
                    />
                    <span className="text-xs">{vehicle.modelName} ({vehicle.year})</span>
                  </label>
                ))}
              </div>
              {vehicles?.length === 0 && (
                <p className="text-xs text-gray-400 italic">Chưa có dòng xe nào trong hệ thống</p>
              )}
            </div>
          </div>

          <DialogFooter className="p-6 bg-gray-50/50 border-t border-gray-100 flex flex-row gap-3">
            <Button type="button" variant="ghost" onClick={onClose} className="flex-1 rounded-lg text-gray-600 hover:bg-gray-100 h-11 transition-all">
              Hủy
            </Button>
            <Button type="submit" disabled={isLoading} className="flex-1 bg-honda-red hover:bg-red-700 text-white rounded-lg shadow-md shadow-honda-red/20 h-11 font-bold transition-all">
              {isLoading ? <Loader2 className="animate-spin" /> : editingPart ? 'Cập nhật phụ tùng' : 'Thêm phụ tùng'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
