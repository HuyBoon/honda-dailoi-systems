import { PageHeader } from '../../components/PageHeader';

export const Settings = () => {
  return (
    <div className="space-y-6">
      <PageHeader 
        title="Cài đặt hệ thống"
        subtitle="Cấu hình các thông số vận hành của ứng dụng"
      />
      <div className="bg-white p-20 rounded-xl border border-gray-100 shadow-sm flex flex-col items-center justify-center text-gray-400">
        <div className="text-lg font-medium">Tính năng đang được phát triển</div>
        <p className="text-sm">Vui lòng quay lại sau</p>
      </div>
    </div>
  );
};
