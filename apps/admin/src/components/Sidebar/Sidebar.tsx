import { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  LayoutDashboard, Users, Settings, ChevronRight, Package, 
  FileText, Car, ArrowLeftRight, X, Image
} from 'lucide-react';
import { Tooltip, TooltipContent, TooltipTrigger } from '../ui/tooltip';

const MENU_GROUPS = [
  { 
    header: 'TỔNG QUAN', 
    items: [
      { path: '/', label: 'Bảng thống kê', icon: LayoutDashboard }
    ] 
  },
  { 
    header: 'QUẢN LÝ KHO', 
    items: [
      { path: '/inventory', label: 'Kho phụ tùng', icon: Package },
      { path: '/categories', label: 'Danh mục', icon: FileText },
      { path: '/vehicles', label: 'Dòng xe', icon: Car },
    ]
  },
  { 
    header: 'GIAO DỊCH', 
    items: [
      { path: '/transactions', label: 'Nhập / Xuất kho', icon: ArrowLeftRight },
      { path: '/orders', label: 'Đơn bán hàng', icon: Package },
    ]
  },
  { 
    header: 'HỆ THỐNG', 
    items: [
      { path: '/users', label: 'Quản lý nhân viên', icon: Users },
      { path: '/media', label: 'Quản lý hình ảnh', icon: Image },
      { path: '/settings', label: 'Cài đặt', icon: Settings },
    ]
  }
];

interface SidebarProps {
  isCollapsed: boolean;
  isMobileOpen: boolean;
  setIsMobileOpen: (val: boolean) => void;
}

export const Sidebar = ({ isCollapsed, isMobileOpen, setIsMobileOpen }: SidebarProps) => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024);
      if (window.innerWidth >= 1024) setIsMobileOpen(false);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [setIsMobileOpen]);

  return (
    <>
      {/* Overlay cho Mobile */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-[90] lg:hidden backdrop-blur-sm"
            onClick={() => setIsMobileOpen(false)}
          />
        )}
      </AnimatePresence>
      
      <motion.aside 
        animate={{ 
          width: isMobile ? 260 : (isCollapsed ? 80 : 260),
          x: isMobile ? (isMobileOpen ? 0 : -260) : 0
        }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
        className="fixed inset-y-0 left-0 bg-white border-r border-gray-200 flex flex-col z-[100] overflow-hidden shadow-sm"
      >
        {/* Header Logo */}
        <div className="h-16 px-5 flex items-center justify-between border-b border-gray-100 relative shrink-0">
          <div className={`flex items-center gap-3 overflow-hidden whitespace-nowrap transition-all duration-300 ${isCollapsed && !isMobile ? 'justify-center w-full' : ''}`}>
            <div className={`shrink-0 transition-all duration-300 ${isCollapsed && !isMobile ? 'w-10 h-10' : 'w-9 h-9'}`}>
              <img 
                src="/logo.png" 
                alt="Logo Honda Đại Lợi" 
                className="w-full h-full object-contain block"
              />
            </div>
            {(!isCollapsed || isMobile) && (
              <span className="font-bold text-lg tracking-wide text-gray-800 uppercase">Đại Lợi</span>
            )}
          </div>
          
          {isMobile && (
            <button className="text-gray-400 hover:text-red-600" onClick={() => setIsMobileOpen(false)}>
              <X size={20} />
            </button>
          )}
        </div>

        {/* Menu cuộn */}
        <nav className="flex-1 flex flex-col py-4 overflow-y-auto custom-scrollbar">
          {MENU_GROUPS.map((group, groupIdx) => (
            <div key={groupIdx} className="mb-6">
              {(!isCollapsed || isMobile) && group.header && (
                <h4 className="px-6 py-2 text-xs font-semibold text-gray-400 uppercase tracking-wider">
                  {group.header}
                </h4>
              )}
              <ul className="space-y-1">
                {group.items.map((item) => {
                  const navLinkContent = (
                    <NavLink 
                      to={item.path}
                      onClick={() => isMobile && setIsMobileOpen(false)}
                      className={({ isActive }) => `
                        flex items-center mx-3 px-3 py-2.5 rounded-lg transition-colors group
                        ${isActive ? 'bg-red-600 text-white shadow-md' : 'text-gray-600 hover:bg-red-50 hover:text-red-600'}
                        ${isCollapsed && !isMobile ? 'justify-center' : ''}
                      `}
                    >
                      {({ isActive }) => (
                        <>
                          <item.icon size={20} className={`shrink-0 ${isCollapsed && !isMobile ? '' : 'mr-3'} ${isActive ? 'text-white' : 'text-gray-400 group-hover:text-red-600'}`} />
                          {(!isCollapsed || isMobile) && <span className="text-sm font-medium">{item.label}</span>}
                          {(!isCollapsed || isMobile) && <ChevronRight size={16} className={`ml-auto ${isActive ? 'text-white/70' : 'text-gray-300 group-hover:text-red-400 opacity-0 group-hover:opacity-100 transition-opacity'}`} />}
                        </>
                      )}
                    </NavLink>
                  );

                  return (
                    <li key={item.path}>
                      {isCollapsed && !isMobile ? (
                        <Tooltip>
                          <TooltipTrigger className="w-full focus:outline-none">
                            {navLinkContent}
                          </TooltipTrigger>
                          <TooltipContent side="right" className="bg-gray-800 text-white font-medium text-xs rounded-md px-3 py-2 shadow-lg border border-gray-700 ml-4 z-[150] flex items-center">
                            {item.label}
                          </TooltipContent>
                        </Tooltip>
                      ) : (
                        navLinkContent
                      )}
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </nav>

        {/* Footer cố định ở dưới */}
        <div className="p-4 border-t border-gray-100  shrink-0 flex items-center justify-center">
          <div className={`transition-all duration-300   ${isCollapsed && !isMobile ? 'w-8 h-8' : 'w-40 h-auto'}`}>
            <img 
              src="/logo.png" 
              alt="Footer Logo" 
              className="w-full h-full object-contain block"
            />
          </div>
        </div>

      </motion.aside>
    </>
  );
};