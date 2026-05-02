import React from 'react';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '../ui/table';
import { Button } from '../ui/button';
import { Trash2, User, Phone, MapPin, Mail, Calendar } from 'lucide-react';
import { type Customer } from '../../store/api/customerApiSlice';

interface CustomerTableProps {
  customers: Customer[];
  onDelete: (id: string) => void;
}

export const CustomerTable: React.FC<CustomerTableProps> = ({ customers, onDelete }) => {
  return (
    <div className="w-full">
      <Table>
        <TableHeader className="bg-gray-50/50">
          <TableRow>
            <TableHead className="w-[250px] font-bold text-gray-700">Khách hàng</TableHead>
            <TableHead className="font-bold text-gray-700">Liên hệ</TableHead>
            <TableHead className="font-bold text-gray-700">Địa chỉ</TableHead>
            <TableHead className="font-bold text-gray-700">Ngày tham gia</TableHead>
            <TableHead className="text-right font-bold text-gray-700">Thao tác</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {customers.length === 0 ? (
            <TableRow>
              <TableCell colSpan={5} className="h-40 text-center text-gray-500 font-medium">
                Chưa có khách hàng nào trong hệ thống
              </TableCell>
            </TableRow>
          ) : (
            customers.map((customer) => (
              <TableRow key={customer.id} className="hover:bg-gray-50/50 transition-colors">
                <TableCell>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-honda-red/10 flex items-center justify-center text-honda-red">
                      <User size={20} />
                    </div>
                    <div>
                      <p className="font-bold text-gray-900">{customer.name}</p>
                      <div className="flex items-center gap-1.5 text-xs text-gray-500 font-medium mt-0.5">
                        <Mail size={12} />
                        {customer.user?.email || 'N/A'}
                      </div>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2 text-sm text-gray-600 font-medium">
                    <Phone size={14} className="text-gray-400" />
                    {customer.phone}
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2 text-sm text-gray-600 font-medium max-w-[200px] truncate">
                    <MapPin size={14} className="text-gray-400 shrink-0" />
                    {customer.address || 'Chưa cập nhật'}
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2 text-sm text-gray-600 font-medium">
                    <Calendar size={14} className="text-gray-400" />
                    {new Date(customer.createdAt).toLocaleDateString('vi-VN')}
                  </div>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Button 
                      variant="outline" 
                      size="icon" 
                      onClick={() => onDelete(customer.id)}
                      className="w-9 h-9 rounded-xl border-gray-100 text-gray-400 hover:text-red-600 hover:border-red-100 hover:bg-red-50 transition-all"
                    >
                      <Trash2 size={16} />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
};
