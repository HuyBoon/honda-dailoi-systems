import { Car, Edit2, Trash2 } from 'lucide-react';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '../ui/table';
import { Button } from '../ui/button';

interface VehicleTableProps {
  vehicles: any[];
  onEdit: (vehicle: any) => void;
  onDelete: (id: string) => void;
}

export const VehicleTable = ({ vehicles, onEdit, onDelete }: VehicleTableProps) => {
  return (
    <Table>
      <TableHeader className="bg-gray-50/50">
        <TableRow>
          <TableHead className="w-[100px] text-gray-400 font-semibold uppercase text-[11px] tracking-wider px-6">STT</TableHead>
          <TableHead className="text-gray-400 font-semibold uppercase text-[11px] tracking-wider">Tên dòng xe</TableHead>
          <TableHead className="text-gray-400 font-semibold uppercase text-[11px] tracking-wider">Năm sản xuất</TableHead>
          <TableHead className="text-gray-400 font-semibold uppercase text-[11px] tracking-wider">Phân khối</TableHead>
          <TableHead className="text-right text-gray-400 font-semibold uppercase text-[11px] tracking-wider px-6">Thao tác</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {vehicles.length > 0 ? (
          vehicles.map((v, index) => (
            <TableRow key={v.id} className="hover:bg-gray-50/50 transition-colors">
              <TableCell className="font-medium text-gray-600 px-6">{index + 1}</TableCell>
              <TableCell>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-red-50 flex items-center justify-center text-red-600">
                    <Car size={16} />
                  </div>
                  <span className="font-semibold text-gray-900">{v.modelName}</span>
                </div>
              </TableCell>
              <TableCell className="text-gray-600 font-medium">{v.year}</TableCell>
              <TableCell className="text-gray-500 font-medium">{v.engineSize || '---'}</TableCell>
              <TableCell className="text-right px-6">
                <div className="flex justify-end gap-2">
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    onClick={() => onEdit(v)}
                    className="text-blue-600 hover:bg-blue-50"
                  >
                    <Edit2 size={16} />
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    onClick={() => onDelete(v.id)}
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
            <TableCell colSpan={5} className="h-48 text-center text-gray-400">
              Chưa có dòng xe nào được tạo
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
};
