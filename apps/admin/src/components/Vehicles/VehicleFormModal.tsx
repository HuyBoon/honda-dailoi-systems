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

interface VehicleFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  editingVehicle: any;
  onSubmit: (data: any) => Promise<void>;
  isLoading: boolean;
}

export const VehicleFormModal = ({ 
  isOpen, 
  onClose, 
  editingVehicle, 
  onSubmit, 
  isLoading 
}: VehicleFormModalProps) => {
  const [formData, setFormData] = useState({ modelName: '', year: new Date().getFullYear(), engineSize: '' });

  useEffect(() => {
    if (editingVehicle) {
      setFormData({ 
        modelName: editingVehicle.modelName, 
        year: editingVehicle.year, 
        engineSize: editingVehicle.engineSize || '' 
      });
    } else {
      setFormData({ modelName: '', year: new Date().getFullYear(), engineSize: '' });
    }
  }, [editingVehicle, isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.modelName || !formData.year) {
      toast.error('Vui lòng điền tên dòng xe và năm sản xuất');
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
              {editingVehicle ? 'Chỉnh sửa dòng xe' : 'Thêm dòng xe mới'}
            </DialogTitle>
          </DialogHeader>
          <div className="p-6 space-y-4">
            <div className="space-y-2">
              <Label htmlFor="modelName" className="text-sm font-semibold text-gray-700">Tên dòng xe <span className="text-red-500">*</span></Label>
              <Input 
                id="modelName" 
                value={formData.modelName}
                onChange={(e) => setFormData({ ...formData, modelName: e.target.value })}
                placeholder="VD: Air Blade 125"
                className="rounded-lg border-gray-200 focus:ring-red-600/20 focus:border-red-600"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="year" className="text-sm font-semibold text-gray-700">Năm sản xuất <span className="text-red-500">*</span></Label>
                <Input 
                  id="year" 
                  type="number"
                  value={formData.year}
                  onChange={(e) => setFormData({ ...formData, year: Number(e.target.value) })}
                  className="rounded-lg border-gray-200 focus:ring-red-600/20 focus:border-red-600"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="engineSize" className="text-sm font-semibold text-gray-700">Dung tích (cc)</Label>
                <Input 
                  id="engineSize" 
                  value={formData.engineSize}
                  onChange={(e) => setFormData({ ...formData, engineSize: e.target.value })}
                  placeholder="VD: 125cc"
                  className="rounded-lg border-gray-200 focus:ring-red-600/20 focus:border-red-600"
                />
              </div>
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
              {isLoading ? <Loader2 className="animate-spin" /> : 'Lưu dòng xe'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
