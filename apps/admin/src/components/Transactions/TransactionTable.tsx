import { ArrowUpRight, ArrowDownLeft, Calendar, History } from 'lucide-react';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '../ui/table';
import { Badge } from '../ui/badge';
import { format } from 'date-fns';
import { TransactionType } from '../../store/api/transactionApiSlice';

interface TransactionTableProps {
  transactions: any[];
}

export const TransactionTable = ({ transactions }: TransactionTableProps) => {
  return (
    <Table>
      <TableHeader className="bg-gray-50/50">
        <TableRow>
          <TableHead className="text-gray-400 font-semibold uppercase text-[11px] tracking-wider px-6 text-center w-[80px]">Loại</TableHead>
          <TableHead className="text-gray-400 font-semibold uppercase text-[11px] tracking-wider">Thời gian</TableHead>
          <TableHead className="text-gray-400 font-semibold uppercase text-[11px] tracking-wider">Phụ tùng</TableHead>
          <TableHead className="text-gray-400 font-semibold uppercase text-[11px] tracking-wider text-center">Số lượng</TableHead>
          <TableHead className="text-gray-400 font-semibold uppercase text-[11px] tracking-wider">Ghi chú</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {transactions.length > 0 ? (
          transactions.map((t) => (
            <TableRow key={t.id} className="hover:bg-gray-50/50 transition-colors">
              <TableCell className="px-6 text-center">
                <div className={`mx-auto w-9 h-9 rounded-full flex items-center justify-center ${
                  t.type === TransactionType.IMPORT 
                    ? 'bg-green-50 text-green-600' 
                    : 'bg-orange-50 text-orange-600'
                }`}>
                  {t.type === TransactionType.IMPORT ? <ArrowDownLeft size={18} /> : <ArrowUpRight size={18} />}
                </div>
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-2 text-gray-600">
                  <Calendar size={14} className="text-gray-400" />
                  <span className="text-sm font-medium">{format(new Date(t.createdAt), 'dd/MM/yyyy HH:mm')}</span>
                </div>
              </TableCell>
              <TableCell>
                <div className="flex flex-col">
                  <span className="font-semibold text-gray-900">{t.part.name}</span>
                  <span className="text-[11px] font-mono font-bold text-gray-400">{t.part.partNumber}</span>
                </div>
              </TableCell>
              <TableCell className="text-center">
                <Badge className={`rounded-lg h-7 px-3 font-bold border-none ${
                  t.type === TransactionType.IMPORT 
                  ? 'bg-green-100 text-green-700' 
                  : 'bg-orange-100 text-orange-700'
                }`}>
                  {t.type === TransactionType.IMPORT ? '+' : '-'}{t.quantity}
                </Badge>
              </TableCell>
              <TableCell className="text-gray-500 max-w-[250px] truncate italic text-sm">
                {t.notes || '---'}
              </TableCell>
            </TableRow>
          ))
        ) : (
          <TableRow>
            <TableCell colSpan={5} className="h-64 text-center">
              <div className="flex flex-col items-center justify-center text-gray-400 gap-2">
                <History size={48} className="opacity-20" />
                <p>Chưa có dữ liệu giao dịch</p>
              </div>
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
};
