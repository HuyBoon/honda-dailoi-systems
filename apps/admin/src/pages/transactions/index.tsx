import { useState } from 'react';
import { 
  useGetTransactionsQuery, 
  useCreateTransactionMutation
} from '../../store/api/transactionApiSlice';
import { useGetPartsQuery } from '../../store/api/partApiSlice';
import { Button } from '../../components/ui/button';
import { Loader2 } from 'lucide-react';
import { toast } from 'react-hot-toast';
import { TransactionTable } from '../../components/Transactions/TransactionTable';
import { TransactionFormModal } from '../../components/Transactions/TransactionFormModal';
import { PageHeader } from '../../components/PageHeader';

export const Transactions = () => {
  const { data: transactions, isLoading } = useGetTransactionsQuery();
  const { data: parts } = useGetPartsQuery({});
  const [createTransaction, { isLoading: isCreating }] = useCreateTransactionMutation();

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSubmit = async (formData: any) => {
    try {
      await createTransaction(formData).unwrap();
      toast.success('Ghi nhận giao dịch thành công');
      setIsModalOpen(false);
    } catch (err: any) {
      toast.error(err.data?.message || 'Có lỗi xảy ra khi thực hiện giao dịch');
    }
  };

  return (
    <div className="space-y-6">
      <PageHeader 
        title="Nhập / Xuất kho"
        subtitle="Xem lịch sử biến động và quản lý kho hàng"
        actionButtonText="Tạo phiếu kho"
        onActionClick={() => setIsModalOpen(true)}
      />

      <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
        {isLoading ? (
          <div className="h-64 flex items-center justify-center">
            <Loader2 className="w-8 h-8 animate-spin text-red-600" />
          </div>
        ) : (
          <TransactionTable transactions={transactions || []} />
        )}
      </div>

      <TransactionFormModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        parts={parts || []} 
        onSubmit={handleSubmit} 
        isLoading={isCreating} 
      />
    </div>
  );
};
