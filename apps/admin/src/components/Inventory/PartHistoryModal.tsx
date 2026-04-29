import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle 
} from '../ui/dialog';
import { 
  useGetTransactionsQuery 
} from '../../store/api/transactionApiSlice';
import { Loader2, ArrowUpRight, ArrowDownLeft, History, Package } from 'lucide-react';
import { format } from 'date-fns';

interface PartHistoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  part: any;
}

export const PartHistoryModal = ({ isOpen, onClose, part }: PartHistoryModalProps) => {
  const { data: transactions, isLoading } = useGetTransactionsQuery(part?.id, {
    skip: !part?.id || !isOpen
  });

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px] rounded-2xl bg-white p-0 overflow-hidden border-none shadow-2xl flex flex-col max-h-[85vh]">
        <DialogHeader className="p-6 pb-4 border-b border-gray-100 flex flex-row items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-red-50 flex items-center justify-center text-red-600">
              <History size={20} />
            </div>
            <div>
              <DialogTitle className="text-xl font-bold text-gray-900">Lịch sử giao dịch</DialogTitle>
              <p className="text-xs text-gray-400 font-medium mt-0.5 flex items-center gap-1">
                <Package size={12} /> {part?.partNumber} • {part?.name}
              </p>
            </div>
          </div>
        </DialogHeader>
        
        <div className="flex-1 overflow-y-auto p-6 custom-scrollbar">
          {isLoading ? (
            <div className="h-64 flex items-center justify-center">
              <Loader2 className="w-8 h-8 animate-spin text-honda-red" />
            </div>
          ) : transactions && transactions.length > 0 ? (
            <div className="space-y-6 relative before:absolute before:left-[17px] before:top-2 before:bottom-2 before:w-0.5 before:bg-gray-100">
              {transactions.map((tx) => (
                <div key={tx.id} className="relative pl-10 group">
                  {/* Timeline Dot */}
                  <div className={`absolute left-0 top-1 w-9 h-9 rounded-full border-4 border-white shadow-sm flex items-center justify-center z-10 transition-transform group-hover:scale-110 ${
                    tx.type === 'IMPORT' ? 'bg-green-500 text-white' : 'bg-orange-500 text-white'
                  }`}>
                    {tx.type === 'IMPORT' ? <ArrowDownLeft size={16} /> : <ArrowUpRight size={16} />}
                  </div>

                  <div className="bg-gray-50/50 rounded-xl p-4 border border-gray-100 group-hover:bg-white group-hover:shadow-md transition-all duration-300">
                    <div className="flex justify-between items-start mb-2">
                      <div className="flex flex-col">
                        <span className={`text-xs font-black uppercase tracking-widest ${
                          tx.type === 'IMPORT' ? 'text-green-600' : 'text-orange-600'
                        }`}>
                          {tx.type === 'IMPORT' ? 'Nhập kho' : 'Xuất kho'}
                        </span>
                        <span className="text-[10px] text-gray-400 font-medium">
                          {format(new Date(tx.createdAt), 'dd/MM/yyyy HH:mm')}
                        </span>
                      </div>
                      <span className={`text-lg font-black ${
                        tx.type === 'IMPORT' ? 'text-green-600' : 'text-orange-600'
                      }`}>
                        {tx.type === 'IMPORT' ? '+' : '-'}{tx.quantity}
                      </span>
                    </div>
                    {tx.notes && (
                      <p className="text-xs text-gray-600 bg-white p-2 rounded-lg border border-gray-50 italic">
                        "{tx.notes}"
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="h-64 flex flex-col items-center justify-center text-gray-400 gap-3">
              <History size={48} className="opacity-10" />
              <p className="text-sm font-medium">Chưa có giao dịch nào cho phụ tùng này</p>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};
