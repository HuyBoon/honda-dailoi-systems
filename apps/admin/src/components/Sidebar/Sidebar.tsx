import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  LayoutDashboard, 
  Users, 
  Settings, 
  LogOut,
  ChevronLeft,
  ChevronRight,
  Package
} from 'lucide-react';
import { useAppDispatch } from '../../store/hooks';
import { logout } from '../../store/slices/authSlice';

const NAV_ITEMS = [
  { path: '/', label: 'Dashboard', icon: LayoutDashboard },
  { path: '/users', label: 'Users', icon: Users },
  { path: '/inventory', label: 'Inventory', icon: Package },
  { path: '/settings', label: 'Settings', icon: Settings },
];

export const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const dispatch = useAppDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <motion.aside 
      className="h-screen bg-[#141419]/95 backdrop-blur-xl border-r border-white/5 flex flex-col text-white sticky top-0 z-[100] overflow-x-hidden shadow-xl"
      initial={false}
      animate={{ width: isCollapsed ? 80 : 260 }}
      transition={{ duration: 0.3, ease: 'easeInOut' }}
    >
      <div className={`h-20 flex items-center border-b border-white/5 ${isCollapsed ? 'justify-center px-0' : 'justify-between px-6'}`}>
        {!isCollapsed && (
          <motion.h2 
            className="text-xl font-bold m-0 text-white tracking-wide whitespace-nowrap"
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }}
          >
            HDL Admin
          </motion.h2>
        )}
        <button 
          className="bg-transparent border-none text-honda-light/60 cursor-pointer flex items-center justify-center p-2 rounded-lg transition-all hover:bg-white/10 hover:text-white"
          onClick={() => setIsCollapsed(!isCollapsed)}
          aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {isCollapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
        </button>
      </div>

      <nav className="flex-1 py-6 px-4 flex flex-col gap-2">
        {NAV_ITEMS.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink 
              key={item.path} 
              to={item.path} 
              className={({ isActive }) => `flex items-center px-4 py-3.5 rounded-xl text-[#a0a0a5] decoration-none transition-all duration-200 whitespace-nowrap outline-none ${isActive ? 'bg-honda-red/15 text-honda-red font-medium border-l-4 border-honda-red' : 'hover:bg-white/5 hover:text-white border-l-4 border-transparent'} ${isCollapsed ? 'justify-center px-0' : ''}`}
              title={isCollapsed ? item.label : undefined}
            >
              <Icon size={22} className="flex-shrink-0" />
              {!isCollapsed && <span className="ml-4 text-[0.95rem]">{item.label}</span>}
            </NavLink>
          );
        })}
      </nav>

      <div className="p-4 border-t border-white/5">
        <button 
          className={`w-full flex items-center px-4 py-3.5 rounded-xl text-[#a0a0a5] decoration-none transition-all duration-200 whitespace-nowrap outline-none bg-transparent border-none cursor-pointer hover:bg-red-500/10 hover:text-red-400 font-inherit text-left ${isCollapsed ? 'justify-center px-0' : ''}`}
          onClick={handleLogout} 
          title={isCollapsed ? "Logout" : undefined}
        >
          <LogOut size={22} className="flex-shrink-0" />
          {!isCollapsed && <span className="ml-4 text-[0.95rem]">Logout</span>}
        </button>
      </div>
    </motion.aside>
  );
};
