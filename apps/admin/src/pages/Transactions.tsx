import { useState } from 'react';
import { 
  useGetTransactionsQuery, 
  useCreateTransactionMutation,
  TransactionType
} from '../store/api/transactionApiSlice';
import { useGetPartsQuery } from '../store/api/partApiSlice';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '../components/ui/table';
import { Button } from '../components/ui/button';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogFooter 
} from '../components/ui/dialog';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '../components/ui/select';
import { Badge } from '../components/ui/badge';
import { 
  ArrowUpRight, 
  ArrowDownLeft, 
  History, 
  Plus, 
  Loader2, 
  Search, 
  Calendar 
} from 'lucide-react';
import { toast } from 'react-hot-toast';
import { format } from 'date-fns';

export const Transactions = () => {
  const { data: transactions, isLoading } = useGetTransactionsQuery();
  const { data: parts } = useGetPartsQuery({});
  const [createTransaction, { isLoading: isCreating }] = useCreateTransactionMutation();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    partId: '',
    type: TransactionType.IMPORT,
    quantity: 1,
    notes: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.partId || formData.quantity < 1) {
      toast.error('Vui lòng chọn phụ tùng và nhập số lượng hợp lệ');
      return;
    }

    try {
      await createTransaction(formData).unwrap();
      toast.success('Ghi nhận giao dịch thành công');
      setIsModalOpen(false);
      setFormData({ partId: '', type: TransactionType.IMPORT, quantity: 1, notes: '' });
    } catch (err: any) {
      toast.error(err.data?.message || 'Có lỗi xảy ra khi thực hiện giao dịch');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center bg-white p-5 rounded-xl border border-gray-100 shadow-sm">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Nhập / Xuất kho</h1>
          <p className="text-sm text-gray-500">Xem lịch sử biến động và quản lý kho hàng</p>
        </div>
        <Button 
          onClick={() => setIsModalOpen(true)} 
          className="bg-red-600 hover:bg-red-700 text-white gap-2 h-10 px-4 rounded-lg shadow-sm"
        >
          <Plus size={18} />
          Tạo phiếu kho
        </Button>
      </div>

      <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
        {isLoading ? (
          <div className="h-64 flex items-center justify-center">
            <Loader2 className="w-8 h-8 animate-spin text-red-600" />
          </div>
        ) : (
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
              {transactions && transactions.length > 0 ? (
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
        )}
      </div>

      {/* Modal Phiếu Kho */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="sm:max-w-[450px] rounded-2xl bg-white p-0 overflow-hidden border-none shadow-2xl">
          <form onSubmit={handleSubmit}>
            <DialogHeader className="p-6 pb-2">
              <DialogTitle className="text-xl font-bold text-gray-900">Tạo phiếu kho mới</DialogTitle>
            </DialogHeader>
            <div className="p-6 space-y-5">
              <div className="space-y-2">
                <Label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Phụ tùng *</Label>
                <Select 
                  value={formData.partId} 
                  onValueChange={(val) => setFormData({...formData, partId: val})}
                >
                  <SelectTrigger className="rounded-lg border-gray-200">
                    <SelectValue placeholder="Chọn phụ tùng cần giao dịch" />
                  </SelectTrigger>
                  <SelectContent className="bg-white border-gray-100 max-h-[300px]">
                    <div className="p-2 sticky top-0 bg-white z-10 border-b border-gray-100 mb-1">
                      <div className="relative">
                        <Search className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-400" size={14} />
                        <Input className="h-8 pl-8 text-xs border-none bg-gray-50" placeholder="Tìm phụ tùng..." />
                      </div>
                    </div>
                    {parts?.map(part => (
                      <SelectItem key={part.id} value={part.id} className="cursor-pointer">
                        <div className="flex flex-col">
                          <span className="font-semibold text-sm">{part.name}</span>
                          <span className="text-[10px] text-gray-400">{part.partNumber} • Còn: {part.stockQuantity}</span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Loại giao dịch *</Label>
                  <Select 
                    value={formData.type} 
                    onValueChange={(val: TransactionType) => setFormData({...formData, type: val})}
                  >
                    <SelectTrigger className="rounded-lg border-gray-200">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-white border-gray-100">
                      <SelectItem value={TransactionType.IMPORT}>Nhập kho</SelectItem>
                      <SelectItem value={TransactionType.EXPORT}>Xuất kho</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Số lượng *</Label>
                  <Input 
                    type="number"
                    min={1}
                    value={formData.quantity}
                    onChange={(e) => setFormData({...formData, quantity: parseInt(e.target.value) || 1})}
                    className="rounded-lg border-gray-200 focus:ring-red-600/20 focus:border-red-600 font-bold"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Ghi chú</Label>
                <Input 
                  placeholder="VD: Nhập thêm từ Honda VN..." 
                  value={formData.notes}
                  onChange={(e) => setFormData({...formData, notes: e.target.value})}
                  className="rounded-lg border-gray-200 focus:ring-red-600/20 focus:border-red-600"
                />
              </div>
            </div>
            <DialogFooter className="p-6 bg-gray-50/50 border-t border-gray-100 flex flex-row gap-3">
              <Button type="button" variant="ghost" onClick={() => setIsModalOpen(false)} className="flex-1 rounded-lg text-gray-600 hover:bg-gray-100 h-11">
                Hủy
              </Button>
              <Button type="submit" disabled={isCreating} className="flex-1 bg-red-600 hover:bg-red-700 text-white rounded-lg shadow-md shadow-red-600/20 h-11 font-bold">
                {isCreating ? <Loader2 className="animate-spin" /> : 'Ghi nhận giao dịch'}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};
