import { useState } from 'react';
import { 
  useGetVehiclesQuery, 
  useCreateVehicleMutation, 
  useUpdateVehicleMutation, 
  useDeleteVehicleMutation 
} from '../../store/api/vehicleApiSlice';
import { Button } from '../../components/ui/button';
import { Loader2 } from 'lucide-react';
import { toast } from 'react-hot-toast';
import { VehicleTable } from '../../components/Vehicles/VehicleTable';
import { VehicleFormModal } from '../../components/Vehicles/VehicleFormModal';
import { PageHeader } from '../../components/PageHeader';

export const Vehicles = () => {
  const { data: vehicles, isLoading } = useGetVehiclesQuery();
  const [createVehicle, { isLoading: isCreating }] = useCreateVehicleMutation();
  const [updateVehicle, { isLoading: isUpdating }] = useUpdateVehicleMutation();
  const [deleteVehicle] = useDeleteVehicleMutation();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingVehicle, setEditingVehicle] = useState<any>(null);

  const handleOpenAdd = () => {
    setEditingVehicle(null);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (vehicle: any) => {
    setEditingVehicle(vehicle);
    setIsModalOpen(true);
  };

  const handleSubmit = async (formData: any) => {
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
      <PageHeader 
        title="Quản lý dòng xe"
        subtitle="Danh sách các dòng xe Honda hỗ trợ phụ tùng"
        actionButtonText="Thêm dòng xe"
        onActionClick={handleOpenAdd}
      />

      <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
        {isLoading ? (
          <div className="h-64 flex items-center justify-center">
            <Loader2 className="w-8 h-8 animate-spin text-red-600" />
          </div>
        ) : (
          <VehicleTable 
            vehicles={vehicles || []} 
            onEdit={handleOpenEdit} 
            onDelete={handleDelete} 
          />
        )}
      </div>

      <VehicleFormModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        editingVehicle={editingVehicle} 
        onSubmit={handleSubmit} 
        isLoading={isCreating || isUpdating} 
      />
    </div>
  );
};
