import { Edit2, Trash2, User as UserIcon, ShieldCheck, Shield, UserCog } from 'lucide-react';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '../ui/table';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { type User, Role } from '../../store/api/userApiSlice';
import { format } from 'date-fns';

interface UserTableProps {
  users: User[];
  onEdit: (user: User) => void;
  onDelete: (id: string) => void;
}

const RoleBadge = ({ role }: { role: Role }) => {
  switch (role) {
    case Role.SUPER_ADMIN:
      return <Badge className="bg-purple-100 text-purple-700 border-none flex gap-1 items-center"><ShieldCheck size={12} /> Super Admin</Badge>;
    case Role.ADMIN:
      return <Badge className="bg-red-100 text-red-700 border-none flex gap-1 items-center"><Shield size={12} /> Admin</Badge>;
    case Role.MANAGER:
      return <Badge className="bg-blue-100 text-blue-700 border-none flex gap-1 items-center"><UserCog size={12} /> Manager</Badge>;
    default:
      return <Badge variant="outline" className="text-gray-500 flex gap-1 items-center"><UserIcon size={12} /> Staff</Badge>;
  }
};

export const UserTable = ({ users, onEdit, onDelete }: UserTableProps) => {
  return (
    <Table>
      <TableHeader className="bg-gray-50/50">
        <TableRow>
          <TableHead className="w-[80px] text-gray-400 font-semibold uppercase text-[11px] tracking-wider px-6">STT</TableHead>
          <TableHead className="text-gray-400 font-semibold uppercase text-[11px] tracking-wider">Email</TableHead>
          <TableHead className="text-gray-400 font-semibold uppercase text-[11px] tracking-wider">Vai trò</TableHead>
          <TableHead className="text-gray-400 font-semibold uppercase text-[11px] tracking-wider">Ngày tạo</TableHead>
          <TableHead className="text-right text-gray-400 font-semibold uppercase text-[11px] tracking-wider px-6">Thao tác</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {users.length > 0 ? (
          users.map((user, index) => (
            <TableRow key={user.id} className="hover:bg-gray-50/50 transition-colors">
              <TableCell className="font-medium text-gray-600 px-6">{index + 1}</TableCell>
              <TableCell>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-500">
                    <UserIcon size={16} />
                  </div>
                  <span className="font-semibold text-gray-900">{user.email}</span>
                </div>
              </TableCell>
              <TableCell>
                <RoleBadge role={user.role} />
              </TableCell>
              <TableCell className="text-gray-500 text-sm">
                {format(new Date(user.createdAt), 'dd/MM/yyyy')}
              </TableCell>
              <TableCell className="text-right px-6">
                <div className="flex justify-end gap-2">
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    onClick={() => onEdit(user)}
                    className="text-blue-600 hover:bg-blue-50"
                  >
                    <Edit2 size={16} />
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    onClick={() => onDelete(user.id)}
                    className="text-red-600 hover:bg-red-50"
                    disabled={user.role === Role.SUPER_ADMIN}
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
              Chưa có nhân viên nào trong hệ thống
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
};
