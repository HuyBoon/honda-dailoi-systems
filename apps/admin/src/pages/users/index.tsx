import { PageHeader } from '../../components/PageHeader';

export const Users = () => {
  return (
    <div className="space-y-6">
      <PageHeader 
        title="Quản lý nhân viên"
        subtitle="Xem và quản lý danh sách nhân viên trong hệ thống"
      />
      <div className="bg-white p-20 rounded-xl border border-gray-100 shadow-sm flex flex-col items-center justify-center text-gray-400">
        <div className="text-lg font-medium">Tính năng đang được phát triển</div>
        <p className="text-sm">Vui lòng quay lại sau</p>
      </div>
    </div>
  );
};
