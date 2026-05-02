import { useState } from 'react';
import { 
  useGetCustomersQuery, 
  useDeleteCustomerMutation 
} from '../../store/api/customerApiSlice';
import { Loader2, Users } from 'lucide-react';
import { toast } from 'react-hot-toast';
import { CustomerTable } from '../../components/Customers/CustomerTable';
import { PageHeader } from '../../components/PageHeader';
import { Pagination } from '../../components/Pagination';

export const Customers = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;

  const { data: customersData, isLoading } = useGetCustomersQuery({
    page: currentPage,
    limit: pageSize
  });

  const [deleteCustomer] = useDeleteCustomerMutation();

  const handleDelete = async (id: string) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa khách hàng này?')) {
      try {
        await deleteCustomer(id).unwrap();
        toast.success('Xóa khách hàng thành công');
      } catch (err) {
        toast.error('Không thể xóa khách hàng này');
      }
    }
  };

  return (
    <div className="space-y-6 pb-12">
      <PageHeader 
        title="Quản lý khách hàng"
        subtitle="Danh sách khách hàng đã đăng ký tài khoản"
      />

      <div className="bg-white rounded-[2rem] border border-gray-100 shadow-sm overflow-hidden">
        {isLoading ? (
          <div className="h-64 flex items-center justify-center">
            <Loader2 className="w-8 h-8 animate-spin text-honda-red" />
          </div>
        ) : (
          <CustomerTable 
            customers={customersData?.items || []} 
            onDelete={handleDelete} 
          />
        )}
      </div>

      {customersData && (
        <Pagination 
          currentPage={currentPage}
          totalPages={customersData.totalPages}
          onPageChange={setCurrentPage}
          totalItems={customersData.total}
          pageSize={pageSize}
        />
      )}
    </div>
  );
};
