import { Edit2, Trash2, FolderOpen } from 'lucide-react';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '../ui/table';
import { Button } from '../ui/button';

interface CategoryTableProps {
  categories: any[];
  onEdit: (cat: any) => void;
  onDelete: (id: string) => void;
}

export const CategoryTable = ({ categories, onEdit, onDelete }: CategoryTableProps) => {
  return (
    <Table>
      <TableHeader className="bg-gray-50/50">
        <TableRow>
          <TableHead className="w-[100px] text-gray-400 font-semibold uppercase text-[11px] tracking-wider px-6">STT</TableHead>
          <TableHead className="text-gray-400 font-semibold uppercase text-[11px] tracking-wider">Tên danh mục</TableHead>
          <TableHead className="text-gray-400 font-semibold uppercase text-[11px] tracking-wider">Mô tả</TableHead>
          <TableHead className="text-right text-gray-400 font-semibold uppercase text-[11px] tracking-wider px-6">Thao tác</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {categories.length > 0 ? (
          categories.map((cat, index) => (
            <TableRow key={cat.id} className="hover:bg-gray-50/50 transition-colors">
              <TableCell className="font-medium text-gray-600 px-6">{index + 1}</TableCell>
              <TableCell>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-red-50 flex items-center justify-center text-red-600">
                    <FolderOpen size={16} />
                  </div>
                  <span className="font-semibold text-gray-900">{cat.name}</span>
                </div>
              </TableCell>
              <TableCell className="text-gray-500">{cat.description || 'Chưa có mô tả'}</TableCell>
              <TableCell className="text-right px-6">
                <div className="flex justify-end gap-2">
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    onClick={() => onEdit(cat)}
                    className="text-blue-600 hover:bg-blue-50"
                  >
                    <Edit2 size={16} />
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    onClick={() => onDelete(cat.id)}
                    className="text-red-600 hover:bg-red-50"
                  >
                    <Trash2 size={16} />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))
        ) : (
          <TableRow>
            <TableCell colSpan={4} className="h-48 text-center text-gray-400">
              Chưa có danh mục nào được tạo
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
};
