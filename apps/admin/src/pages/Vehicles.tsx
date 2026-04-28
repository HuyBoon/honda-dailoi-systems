import { useState } from 'react';
import { 
  useGetVehiclesQuery, 
  useCreateVehicleMutation, 
  useUpdateVehicleMutation, 
  useDeleteVehicleMutation 
} from '../store/api/vehicleApiSlice';
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
import { Car, Plus, Edit2, Trash2, Loader2 } from 'lucide-react';
import { toast } from 'react-hot-toast';

export const Vehicles = () => {
  const { data: vehicles, isLoading } = useGetVehiclesQuery();
  const [createVehicle, { isLoading: isCreating }] = useCreateVehicleMutation();
  const [updateVehicle, { isLoading: isUpdating }] = useUpdateVehicleMutation();
  const [deleteVehicle] = useDeleteVehicleMutation();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingVehicle, setEditingVehicle] = useState<any>(null);
  const [formData, setFormData] = useState({ modelName: '', year: new Date().getFullYear(), engineSize: '' });

  const handleOpenAdd = () => {
    setEditingVehicle(null);
    setFormData({ modelName: '', year: new Date().getFullYear(), engineSize: '' });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (vehicle: any) => {
    setEditingVehicle(vehicle);
    setFormData({ 
      modelName: vehicle.modelName, 
      year: vehicle.year, 
      engineSize: vehicle.engineSize || '' 
    });
    setIsModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.modelName || !formData.year) {
      toast.error('Vui lòng điền tên dòng xe và năm sản xuất');
      return;
    }

    try {
      if (editingVehicle) {
        await updateVehicle({ id: editingVehicle.id, body: formData }).unwrap();
        toast.success('Cập nhật dòng xe thành công');
      } else {
        await createVehicle(formData).unwrap();
        toast.success('Thêm dòng xe mới thành công');
      }
      setIsModalOpen(false);
    } catch (err) {
      toast.error('Có lỗi xảy ra, vui lòng thử lại');
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa dòng xe này?')) {
      try {
        await deleteVehicle(id).unwrap();
        toast.success('Xóa dòng xe thành công');
      } catch (err) {
        toast.error('Không thể xóa dòng xe này');
      }
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center bg-white p-5 rounded-xl border border-gray-100 shadow-sm">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Quản lý dòng xe</h1>
          <p className="text-sm text-gray-500">Danh sách các dòng xe Honda hỗ trợ phụ tùng</p>
        </div>
        <Button 
          onClick={handleOpenAdd} 
          className="bg-red-600 hover:bg-red-700 text-white gap-2 h-10 px-4 rounded-lg shadow-sm"
        >
          <Plus size={18} />
          Thêm dòng xe
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
                <TableHead className="text-gray-400 font-semibold uppercase text-[11px] tracking-wider">Tên dòng xe</TableHead>
                <TableHead className="text-gray-400 font-semibold uppercase text-[11px] tracking-wider">Năm sản xuất</TableHead>
                <TableHead className="text-gray-400 font-semibold uppercase text-[11px] tracking-wider">Phân khối</TableHead>
                <TableHead className="text-right text-gray-400 font-semibold uppercase text-[11px] tracking-wider px-6">Thao tác</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {vehicles && vehicles.length > 0 ? (
                vehicles.map((v, index) => (
                  <TableRow key={v.id} className="hover:bg-gray-50/50 transition-colors">
                    <TableCell className="font-medium text-gray-600 px-6">{index + 1}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-red-50 flex items-center justify-center text-red-600">
                          <Car size={16} />
                        </div>
                        <span className="font-semibold text-gray-900">{v.modelName}</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-gray-600 font-medium">{v.year}</TableCell>
                    <TableCell className="text-gray-500 font-medium">{v.engineSize || '---'}</TableCell>
                    <TableCell className="text-right px-6">
                      <div className="flex justify-end gap-2">
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          onClick={() => handleOpenEdit(v)}
                          className="text-blue-600 hover:bg-blue-50"
                        >
                          <Edit2 size={16} />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          onClick={() => handleDelete(v.id)}
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
                  <TableCell colSpan={5} className="h-48 text-center text-gray-400">
                    Chưa có dòng xe nào được tạo
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
                {(isCreating || isUpdating) ? <Loader2 className="animate-spin" /> : 'Lưu dòng xe'}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};
