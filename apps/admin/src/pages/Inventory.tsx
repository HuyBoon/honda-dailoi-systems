import { useState } from 'react';
import { 
  useGetPartsQuery, 
  useCreatePartMutation, 
  useUpdatePartMutation, 
  useDeletePartMutation 
} from '../store/api/partApiSlice';
import { useGetCategoriesQuery } from '../store/api/categoryApiSlice';
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
import { Plus, Edit2, Trash2, Search, Loader2, Package, AlertTriangle } from 'lucide-react';
import { toast } from 'react-hot-toast';

export const Inventory = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const { data: categories } = useGetCategoriesQuery();
  const { data: parts, isLoading } = useGetPartsQuery({ 
    categoryId: selectedCategory === 'all' ? undefined : selectedCategory,
    query: searchTerm || undefined
  });

  const [createPart, { isLoading: isCreating }] = useCreatePartMutation();
  const [updatePart, { isLoading: isUpdating }] = useUpdatePartMutation();
  const [deletePart] = useDeletePartMutation();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingPart, setEditingPart] = useState<any>(null);
  const [formData, setFormData] = useState({
    partNumber: '',
    name: '',
    description: '',
    price: 0,
    stockQuantity: 0,
    minStockLevel: 5,
    categoryId: ''
  });

  const handleOpenAdd = () => {
    setEditingPart(null);
    setFormData({
      partNumber: '',
      name: '',
      description: '',
      price: 0,
      stockQuantity: 0,
      minStockLevel: 5,
      categoryId: categories?.[0]?.id || ''
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (part: any) => {
    setEditingPart(part);
    setFormData({
      partNumber: part.partNumber,
      name: part.name,
      description: part.description || '',
      price: Number(part.price),
      stockQuantity: part.stockQuantity,
      minStockLevel: part.minStockLevel,
      categoryId: part.categoryId
    });
    setIsModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.partNumber || !formData.categoryId) {
      toast.error('Vui lòng điền đầy đủ các thông tin bắt buộc');
      return;
    }

    try {
      if (editingPart) {
        await updatePart({ id: editingPart.id, body: formData }).unwrap();
        toast.success('Cập nhật phụ tùng thành công');
      } else {
        await createPart(formData).unwrap();
        toast.success('Thêm phụ tùng mới thành công');
      }
      setIsModalOpen(false);
    } catch (err) {
      toast.error('Có lỗi xảy ra khi lưu phụ tùng');
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa phụ tùng này?')) {
      try {
        await deletePart(id).unwrap();
        toast.success('Xóa phụ tùng thành công');
      } catch (err) {
        toast.error('Không thể xóa phụ tùng này');
      }
    }
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
  };

  return (
    <div className="space-y-6">
      {/* Header & Controls */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white p-5 rounded-xl border border-gray-100 shadow-sm">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Kho phụ tùng</h1>
          <p className="text-sm text-gray-500">Quản lý kho và danh mục phụ tùng Honda</p>
        </div>
        <div className="flex flex-col sm:flex-row w-full md:w-auto gap-3">
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <Input 
              placeholder="Tìm theo mã, tên..." 
              className="pl-10 rounded-lg border-gray-200" 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger className="w-full sm:w-48 rounded-lg border-gray-200">
              <SelectValue placeholder="Tất cả danh mục" />
            </SelectTrigger>
            <SelectContent className="bg-white border-gray-100">
              <SelectItem value="all">Tất cả danh mục</SelectItem>
              {categories?.map(cat => (
                <SelectItem key={cat.id} value={cat.id}>{cat.name}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Button onClick={handleOpenAdd} className="bg-red-600 hover:bg-red-700 text-white gap-2 h-10 rounded-lg px-4 shadow-sm">
            <Plus size={18} />
            Thêm phụ tùng
          </Button>
        </div>
      </div>

      {/* Parts Table */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
        {isLoading ? (
          <div className="h-64 flex items-center justify-center">
            <Loader2 className="w-8 h-8 animate-spin text-red-600" />
          </div>
        ) : (
          <div className="overflow-x-auto">
            <Table>
              <TableHeader className="bg-gray-50/50">
                <TableRow>
                  <TableHead className="text-gray-400 font-semibold uppercase text-[11px] tracking-wider px-6">Mã phụ tùng</TableHead>
                  <TableHead className="text-gray-400 font-semibold uppercase text-[11px] tracking-wider">Tên phụ tùng</TableHead>
                  <TableHead className="text-gray-400 font-semibold uppercase text-[11px] tracking-wider">Danh mục</TableHead>
                  <TableHead className="text-gray-400 font-semibold uppercase text-[11px] tracking-wider">Số lượng</TableHead>
                  <TableHead className="text-gray-400 font-semibold uppercase text-[11px] tracking-wider">Đơn giá</TableHead>
                  <TableHead className="text-right text-gray-400 font-semibold uppercase text-[11px] tracking-wider px-6">Thao tác</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {parts && parts.length > 0 ? (
                  parts.map((part) => (
                    <TableRow key={part.id} className="hover:bg-gray-50/50 transition-colors">
                      <TableCell className="px-6 font-mono text-xs font-bold text-gray-500">{part.partNumber}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-xl bg-gray-50 flex items-center justify-center text-gray-400 shrink-0">
                            <Package size={18} />
                          </div>
                          <div className="flex flex-col">
                            <span className="font-semibold text-gray-900 line-clamp-1">{part.name}</span>
                            <span className="text-[11px] text-gray-400 line-clamp-1">{part.description || 'Không có mô tả'}</span>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className="rounded-full bg-blue-50 text-blue-600 border-blue-100 font-medium h-6 text-[10px]">
                          {part.category.name}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <span className={`font-bold ${part.stockQuantity <= part.minStockLevel ? 'text-red-500' : 'text-gray-700'}`}>
                            {part.stockQuantity}
                          </span>
                          {part.stockQuantity <= part.minStockLevel && (
                            <div className="flex items-center gap-1 bg-red-50 text-red-600 px-1.5 py-0.5 rounded text-[10px] font-bold uppercase">
                              <AlertTriangle size={10} />
                              Sắp hết
                            </div>
                          )}
                        </div>
                      </TableCell>
                      <TableCell className="font-semibold text-gray-900">{formatPrice(Number(part.price))}</TableCell>
                      <TableCell className="text-right px-6">
                        <div className="flex justify-end gap-1">
                          <Button variant="ghost" size="icon" onClick={() => handleOpenEdit(part)} className="text-blue-600 hover:bg-blue-50 transition-colors">
                            <Edit2 size={16} />
                          </Button>
                          <Button variant="ghost" size="icon" onClick={() => handleDelete(part.id)} className="text-red-600 hover:bg-red-50 transition-colors">
                            <Trash2 size={16} />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={6} className="h-64 text-center">
                      <div className="flex flex-col items-center justify-center text-gray-400 gap-2">
                        <Package size={48} className="opacity-20" />
                        <p>Không tìm thấy phụ tùng nào</p>
                      </div>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        )}
      </div>

      {/* Add / Edit Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="sm:max-w-[500px] rounded-2xl bg-white p-0 overflow-hidden border-none shadow-2xl">
          <form onSubmit={handleSubmit}>
            <DialogHeader className="p-6 pb-2">
              <DialogTitle className="text-xl font-bold text-gray-900">
                {editingPart ? 'Cập nhật phụ tùng' : 'Thêm phụ tùng mới'}
              </DialogTitle>
            </DialogHeader>
            <div className="p-6 space-y-4 max-h-[60vh] overflow-y-auto custom-scrollbar">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Mã phụ tùng *</Label>
                  <Input 
                    placeholder="VD: 12345-ABC-000" 
                    value={formData.partNumber}
                    onChange={e => setFormData({...formData, partNumber: e.target.value})}
                    className="rounded-lg border-gray-200 focus:ring-red-600/20 focus:border-red-600 font-mono"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Danh mục *</Label>
                  <Select 
                    value={formData.categoryId} 
                    onValueChange={val => setFormData({...formData, categoryId: val})}
                  >
                    <SelectTrigger className="rounded-lg border-gray-200">
                      <SelectValue placeholder="Chọn danh mục" />
                    </SelectTrigger>
                    <SelectContent className="bg-white border-gray-100">
                      {categories?.map(cat => (
                        <SelectItem key={cat.id} value={cat.id}>{cat.name}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Tên phụ tùng *</Label>
                <Input 
                  placeholder="VD: Bugi NGK AirBlade" 
                  value={formData.name}
                  onChange={e => setFormData({...formData, name: e.target.value})}
                  className="rounded-lg border-gray-200 focus:ring-red-600/20 focus:border-red-600"
                />
              </div>

              <div className="space-y-2">
                <Label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Mô tả</Label>
                <Input 
                  placeholder="Nhập mô tả..." 
                  value={formData.description}
                  onChange={e => setFormData({...formData, description: e.target.value})}
                  className="rounded-lg border-gray-200 focus:ring-red-600/20 focus:border-red-600"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Đơn giá (VND)</Label>
                  <Input 
                    type="number"
                    value={formData.price}
                    onChange={e => setFormData({...formData, price: Number(e.target.value)})}
                    className="rounded-lg border-gray-200 focus:ring-red-600/20 focus:border-red-600 font-bold"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Số lượng tồn</Label>
                  <Input 
                    type="number"
                    value={formData.stockQuantity}
                    onChange={e => setFormData({...formData, stockQuantity: Number(e.target.value)})}
                    className="rounded-lg border-gray-200 focus:ring-red-600/20 focus:border-red-600"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Mức tồn kho tối thiểu</Label>
                <Input 
                  type="number"
                  value={formData.minStockLevel}
                  onChange={e => setFormData({...formData, minStockLevel: Number(e.target.value)})}
                  className="rounded-lg border-gray-200 focus:ring-red-600/20 focus:border-red-600"
                />
              </div>
            </div>
            <DialogFooter className="p-6 bg-gray-50/50 border-t border-gray-100 flex flex-row gap-3">
              <Button type="button" variant="ghost" onClick={() => setIsModalOpen(false)} className="flex-1 rounded-lg text-gray-600 hover:bg-gray-100 h-11">
                Hủy
              </Button>
              <Button type="submit" disabled={isCreating || isUpdating} className="flex-1 bg-red-600 hover:bg-red-700 text-white rounded-lg shadow-md shadow-red-600/20 h-11 font-bold">
                {isCreating || isUpdating ? <Loader2 className="animate-spin" /> : editingPart ? 'Cập nhật phụ tùng' : 'Thêm phụ tùng'}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};
