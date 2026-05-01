import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { History, ArrowUpRight, ArrowDownLeft } from 'lucide-react';

interface RecentTransactionsProps {
  transactions: any[];
}

export const RecentTransactions = ({ transactions }: RecentTransactionsProps) => {
  return (
    <Card className="border-none shadow-md shadow-gray-200/50 rounded-2xl col-span-1 lg:max-h-[500px] overflow-hidden flex flex-col">
      <CardHeader className="p-6 flex flex-row items-center justify-between pb-4">
        <CardTitle className="text-lg font-bold text-gray-800 flex items-center gap-2">
          <History size={18} className="text-red-600" />
          Giao dịch gần đây
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0 flex-1 overflow-y-auto custom-scrollbar">
        <div className="px-6 pb-6">
          {transactions && transactions.length > 0 ? (
            <div className="space-y-4">
              {transactions.map((tx, idx) => (
                <div key={idx} className="flex items-center justify-between group">
                  <div className="flex items-center gap-3">
                    <div className={`w-9 h-9 rounded-full flex items-center justify-center shrink-0 ${tx.type === 'IMPORT' ? 'bg-green-50 text-green-600' : 'bg-orange-50 text-orange-600'}`}>
                      {tx.type === 'IMPORT' ? <ArrowDownLeft size={16} /> : <ArrowUpRight size={16} />}
                    </div>
                    <div className="flex flex-col">
                      <span className="text-sm font-bold text-gray-800 line-clamp-1">{tx.part.name}</span>
                      <span className="text-[11px] font-medium text-gray-400 capitalize">{tx.type === 'IMPORT' ? 'Nhập kho' : 'Xuất kho'} • {new Date(tx.createdAt).toLocaleDateString()}</span>
                    </div>
                  </div>
                  <span className={`text-sm font-black ${tx.type === 'IMPORT' ? 'text-green-600' : 'text-orange-600'}`}>
                    {tx.type === 'IMPORT' ? '+' : '-'}{tx.quantity}
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <div className="h-48 flex items-center justify-center text-gray-400 text-sm">Chưa có giao dịch nào</div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
