import { PageHeader } from '../../components/PageHeader';

export const Orders = () => {
  return (
    <div className="space-y-6">
      <PageHeader 
        title="Quản lý đơn hàng"
        subtitle="Xem và xử lý các đơn đặt hàng phụ tùng"
      />
      <div className="bg-white p-20 rounded-xl border border-gray-100 shadow-sm flex flex-col items-center justify-center text-gray-400">
        <div className="text-lg font-medium">Tính năng đang được phát triển</div>
        <p className="text-sm">Vui lòng quay lại sau</p>
      </div>
    </div>
  );
};
