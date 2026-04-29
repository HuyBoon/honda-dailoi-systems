import { useState } from 'react';
import { 
  useGetUsersQuery, 
  useCreateUserMutation, 
  useUpdateUserMutation, 
  useDeleteUserMutation,
  User
} from '../../store/api/userApiSlice';
import { Loader2 } from 'lucide-react';
import { toast } from 'react-hot-toast';
import { PageHeader } from '../../components/PageHeader';
import { UserTable } from '../../components/Users/UserTable';
import { UserFormModal } from '../../components/Users/UserFormModal';

export const Users = () => {
  const { data: users, isLoading } = useGetUsersQuery();
  const [createUser, { isLoading: isCreating }] = useCreateUserMutation();
  const [updateUser, { isLoading: isUpdating }] = useUpdateUserMutation();
  const [deleteUser] = useDeleteUserMutation();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);

  const handleOpenAdd = () => {
    setEditingUser(null);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (user: User) => {
    setEditingUser(user);
    setIsModalOpen(true);
  };

  const handleSubmit = async (formData: any) => {
    try {
      if (editingUser) {
        await updateUser({ id: editingUser.id, body: formData }).unwrap();
        toast.success('Cập nhật nhân viên thành công');
      } else {
        await createUser(formData).unwrap();
        toast.success('Thêm nhân viên mới thành công');
      }
      setIsModalOpen(false);
    } catch (err: any) {
      toast.error(err.data?.message || 'Có lỗi xảy ra, vui lòng thử lại');
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa nhân viên này?')) {
      try {
        await deleteUser(id).unwrap();
        toast.success('Xóa nhân viên thành công');
      } catch (err) {
        toast.error('Không thể xóa nhân viên này');
      }
    }
  };

  return (
    <div className="space-y-6">
      <PageHeader 
        title="Quản lý nhân viên"
        subtitle="Xem và quản lý danh sách nhân viên trong hệ thống"
        actionButtonText="Thêm nhân viên"
        onActionClick={handleOpenAdd}
      />

      <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
        {isLoading ? (
          <div className="h-64 flex items-center justify-center">
            <Loader2 className="w-8 h-8 animate-spin text-honda-red" />
          </div>
        ) : (
          <UserTable 
            users={users || []} 
            onEdit={handleOpenEdit} 
            onDelete={handleDelete} 
          />
        )}
      </div>

      <UserFormModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        editingUser={editingUser} 
        onSubmit={handleSubmit} 
        isLoading={isCreating || isUpdating} 
      />
    </div>
  );
};
