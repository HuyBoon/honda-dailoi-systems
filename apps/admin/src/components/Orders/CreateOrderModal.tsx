import { useState, useMemo } from 'react';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogFooter 
} from '../ui/dialog';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { 
  Search, Plus, Trash2, User, Phone, 
  ShoppingCart, Package, CreditCard, Loader2,
  AlertCircle
} from 'lucide-react';
import { useGetPartsQuery } from '@/store/api/partApiSlice';
import { toast } from 'react-hot-toast';

interface CreateOrderModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: any) => Promise<void>;
  isLoading: boolean;
}

export const CreateOrderModal = ({ isOpen, onClose, onSubmit, isLoading }: CreateOrderModalProps) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [notes, setNotes] = useState('');
  const [cart, setCart] = useState<any[]>([]);

  const { data: partsData, isLoading: isLoadingParts } = useGetPartsQuery({ 
    q: searchTerm || undefined,
    limit: 50 // Show top 50 results for order creation
  });

  const filteredParts = useMemo(() => {
    if (!partsData?.items) return [];
    // Only show parts with stock > 0
    return partsData.items.filter(p => p.stockQuantity > 0);
  }, [partsData]);

  const addToCart = (part: any) => {
    const existing = cart.find(item => item.partId === part.id);
    if (existing) {
      if (existing.quantity >= part.stockQuantity) {
        toast.error('Vượt quá số lượng tồn kho!');
        return;
      }
      setCart(cart.map(item => 
        item.partId === part.id 
          ? { ...item, quantity: item.quantity + 1 } 
          : item
      ));
    } else {
      setCart([...cart, { 
        partId: part.id, 
        name: part.name, 
        partNumber: part.partNumber,
        price: Number(part.price), 
        quantity: 1,
        stockQuantity: part.stockQuantity
      }]);
    }
    toast.success(`Đã thêm ${part.name}`);
  };

  const updateQuantity = (partId: string, delta: number) => {
    setCart(cart.map(item => {
      if (item.partId === partId) {
        const newQty = item.quantity + delta;
        if (newQty < 1) return item;
        if (newQty > item.stockQuantity) {
          toast.error('Vượt quá số lượng tồn kho!');
          return item;
        }
        return { ...item, quantity: newQty };
      }
      return item;
    }));
  };

  const removeFromCart = (partId: string) => {
    setCart(cart.filter(item => item.partId !== partId));
  };

  const totalAmount = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (cart.length === 0) {
      toast.error('Vui lòng thêm sản phẩm vào đơn hàng');
      return;
    }
    
    await onSubmit({
      customerName: customerName || undefined,
      customerPhone: customerPhone || undefined,
      notes: notes || undefined,
      items: cart.map(item => ({
        partId: item.partId,
        quantity: item.quantity,
        price: item.price
      }))
    });

    // Reset form
    setCart([]);
    setCustomerName('');
    setCustomerPhone('');
    setNotes('');
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[1000px] rounded-2xl bg-white p-0 overflow-hidden border-none shadow-2xl flex flex-col h-[90vh]">
        <form onSubmit={handleSubmit} className="flex flex-col h-full">
          <DialogHeader className="p-6 pb-2 shrink-0 border-b border-gray-50 bg-gray-50/30">
            <DialogTitle className="text-2xl font-black text-gray-900 flex items-center gap-2">
              <ShoppingCart className="text-honda-red" />
              Tạo đơn hàng mới
            </DialogTitle>
          </DialogHeader>

          <div className="flex-1 flex overflow-hidden">
            {/* Left Column: Search & Parts */}
            <div className="w-1/2 border-r border-gray-100 flex flex-col bg-white">
              <div className="p-4 border-b border-gray-50">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                  <Input 
                    placeholder="Tìm phụ tùng theo tên, mã..." 
                    value={searchTerm}
                    onChange={e => setSearchTerm(e.target.value)}
                    className="pl-10 rounded-xl bg-gray-50 border-none focus:ring-2 focus:ring-honda-red/20 h-11"
                  />
                </div>
              </div>
              <div className="flex-1 overflow-y-auto p-4 space-y-3 custom-scrollbar">
                {isLoadingParts ? (
                  <div className="flex justify-center py-10"><Loader2 className="animate-spin text-honda-red" /></div>
                ) : filteredParts.length === 0 ? (
                  <div className="text-center py-10 text-gray-400 text-sm">Không tìm thấy phụ tùng phù hợp</div>
                ) : (
                  filteredParts.map(part => (
                    <div 
                      key={part.id} 
                      className="group p-3 rounded-2xl border border-gray-50 hover:border-red-100 hover:bg-red-50/30 transition-all flex justify-between items-center"
                    >
                      <div className="flex flex-col">
                        <span className="font-bold text-gray-900">{part.name}</span>
                        <span className="text-[10px] text-gray-400 font-mono">{part.partNumber}</span>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-xs font-black text-honda-red">{formatCurrency(Number(part.price))}</span>
                          <span className={`text-[9px] px-1.5 py-0.5 rounded-full font-bold ${part.stockQuantity < 10 ? 'bg-amber-100 text-amber-600' : 'bg-gray-100 text-gray-500'}`}>
                            Tồn: {part.stockQuantity}
                          </span>
                        </div>
                      </div>
                      <Button 
                        type="button" 
                        size="icon" 
                        variant="ghost"
                        onClick={() => addToCart(part)}
                        className="rounded-xl hover:bg-honda-red hover:text-white transition-all shadow-sm"
                      >
                        <Plus size={18} />
                      </Button>
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* Right Column: Cart & Customer */}
            <div className="w-1/2 flex flex-col bg-gray-50/30">
              <div className="flex-1 overflow-y-auto p-6 space-y-6 custom-scrollbar">
                {/* Customer Info Section */}
                <div className="space-y-4">
                  <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-widest flex items-center gap-1">
                    <User size={10} /> Thông tin khách hàng (Tùy chọn)
                  </h4>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-1.5">
                      <Label className="text-[11px] font-bold text-gray-500">Tên khách hàng</Label>
                      <Input 
                        placeholder="Nguyễn Văn A" 
                        value={customerName}
                        onChange={e => setCustomerName(e.target.value)}
                        className="rounded-lg border-gray-200 h-10 text-sm"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <Label className="text-[11px] font-bold text-gray-500">Số điện thoại</Label>
                      <Input 
                        placeholder="09xxx..." 
                        value={customerPhone}
                        onChange={e => setCustomerPhone(e.target.value)}
                        className="rounded-lg border-gray-200 h-10 text-sm"
                      />
                    </div>
                  </div>
                </div>

                {/* Cart Section */}
                <div className="space-y-4">
                  <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-widest flex items-center gap-1">
                    <Package size={10} /> Giỏ hàng ({cart.length})
                  </h4>
                  {cart.length === 0 ? (
                    <div className="bg-white rounded-2xl border border-dashed border-gray-200 py-10 flex flex-col items-center justify-center text-gray-400 gap-2">
                      <ShoppingCart size={32} className="opacity-10" />
                      <p className="text-xs">Chưa có sản phẩm nào</p>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      {cart.map(item => (
                        <div key={item.partId} className="bg-white p-3 rounded-2xl border border-gray-100 flex items-center justify-between shadow-sm">
                          <div className="flex-1 min-w-0 pr-4">
                            <p className="font-bold text-gray-900 truncate text-sm">{item.name}</p>
                            <p className="text-[10px] text-gray-400 font-mono">{formatCurrency(item.price)}</p>
                          </div>
                          <div className="flex items-center gap-3">
                            <div className="flex items-center bg-gray-100 rounded-lg p-0.5">
                              <button 
                                type="button"
                                onClick={() => updateQuantity(item.partId, -1)}
                                className="w-7 h-7 flex items-center justify-center hover:bg-white rounded-md transition-colors"
                              >
                                -
                              </button>
                              <span className="w-8 text-center font-bold text-sm">{item.quantity}</span>
                              <button 
                                type="button"
                                onClick={() => updateQuantity(item.partId, 1)}
                                className="w-7 h-7 flex items-center justify-center hover:bg-white rounded-md transition-colors"
                              >
                                +
                              </button>
                            </div>
                            <button 
                              type="button"
                              onClick={() => removeFromCart(item.partId)}
                              className="text-gray-300 hover:text-red-500 transition-colors"
                            >
                              <Trash2 size={18} />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <div className="space-y-1.5">
                  <Label className="text-[11px] font-bold text-gray-500">Ghi chú đơn hàng</Label>
                  <textarea 
                    placeholder="Nhập ghi chú (nếu có)..."
                    value={notes}
                    onChange={e => setNotes(e.target.value)}
                    className="w-full rounded-xl border-gray-200 p-3 text-sm focus:ring-honda-red/20 focus:border-honda-red min-h-[80px]"
                  />
                </div>
              </div>

              {/* Order Summary Footer */}
              <div className="p-6 bg-white border-t border-gray-100 shrink-0">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-gray-500 font-bold uppercase tracking-widest text-xs">Tổng thanh toán</span>
                  <span className="text-2xl font-black text-honda-red">{formatCurrency(totalAmount)}</span>
                </div>
                <div className="flex gap-3">
                  <Button type="button" variant="ghost" onClick={onClose} className="flex-1 rounded-xl h-12 font-bold text-gray-500">
                    Hủy bỏ
                  </Button>
                  <Button 
                    type="submit" 
                    disabled={isLoading || cart.length === 0}
                    className="flex-1 bg-honda-red hover:bg-red-700 text-white rounded-xl shadow-lg shadow-honda-red/20 h-12 font-black transition-all transform hover:scale-[1.02] active:scale-[0.98]"
                  >
                    {isLoading ? <Loader2 className="animate-spin" /> : <><CreditCard className="mr-2" size={18} /> Tạo đơn ngay</>}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
