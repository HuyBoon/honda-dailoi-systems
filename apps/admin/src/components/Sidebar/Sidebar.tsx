import { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  LayoutDashboard, 
  Users, 
  Settings,
  ChevronRight,
  Package,
  FileText,
  ShieldCheck,
  CreditCard,
  Car,
  ArrowLeftRight,
  X
} from 'lucide-react';

const MENU_GROUPS = [
  {
    header: 'CORE',
    items: [
      { path: '/', label: 'Dashboard', icon: LayoutDashboard },
    ]
  },
  {
    header: 'INVENTORY MANAGEMENT',
    items: [
      { path: '/inventory', label: 'Parts Catalog', icon: Package },
      { path: '/categories', label: 'Categories', icon: FileText },
      { path: '/vehicles', label: 'Vehicle Models', icon: Car },
    ]
  },
  {
    header: 'OPERATIONS',
    items: [
      { path: '/transactions', label: 'Import / Export', icon: ArrowLeftRight },
      { path: '/orders', label: 'Sales Orders', icon: Package },
    ]
  },
  {
    header: 'SYSTEM & LOGS',
    items: [
      { path: '/users', label: 'Staff Management', icon: Users },
      { path: '/settings', label: 'Settings', icon: Settings },
    ]
  }
];

interface SidebarProps {
  isCollapsed: boolean;
  isMobileOpen: boolean;
  setIsMobileOpen: (val: boolean) => void;
}

import { 
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '../ui/tooltip';

export const Sidebar = ({ isCollapsed, isMobileOpen, setIsMobileOpen }: SidebarProps) => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024);
      if (window.innerWidth >= 1024) {
        setIsMobileOpen(false); // Clean up mobile drawer state if pushed to desktop
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [setIsMobileOpen]);

  const MobileOverlay = () => (
    <AnimatePresence>
      {isMobileOpen && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/40 z-[90] lg:hidden backdrop-blur-sm"
          onClick={() => setIsMobileOpen(false)}
        />
      )}
    </AnimatePresence>
  );

  return (
    <>
      <MobileOverlay />
      
      <motion.aside 
        animate={{ 
          width: isCollapsed && !isMobile ? 80 : 260,
          x: isMobileOpen ? 0 : (isMobile ? -260 : 0)
        }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
        className={`h-screen bg-white border-r border-gray-100 flex flex-col fixed lg:relative z-[100] lg:z-50 overflow-y-auto ${isCollapsed && !isMobile ? 'w-[80px]' : 'w-[260px]'} lg:flex-shrink-0
          ${isMobile && !isMobileOpen ? '-translate-x-full' : 'translate-x-0'}`}
      >
        <div className="p-5 flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            {/* Velmax style brand logo */}
            <div className="w-8 h-8 rounded-full bg-honda-red/10 border-2 border-honda-red flex items-center justify-center text-honda-red shrink-0 relative overflow-hidden">
               <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg>
            </div>
            {(!isCollapsed || isMobileOpen) && (
              <span className="font-bold text-xl tracking-wide text-gray-800 uppercase">Đại Lợi</span>
            )}
          </div>
          
          {/* Mobile close button */}
          {isMobileOpen && (
            <button className="lg:hidden text-gray-500 hover:text-honda-red cursor-pointer p-1" onClick={() => setIsMobileOpen(false)}>
              <X size={20} />
            </button>
          )}
        </div>

        <nav className="flex-1 flex flex-col py-2 overflow-y-auto custom-scrollbar">
          {MENU_GROUPS.map((group, groupIdx) => (
            <div key={groupIdx} className="mb-4">
              {(!isCollapsed || isMobileOpen) && group.header && (
                <h4 className="px-6 py-2 text-[11px] font-semibold text-gray-400 monitoring uppercase tracking-wider">
                  {group.header}
                </h4>
              )}
              <ul className="list-none p-0 m-0 space-y-0.5">
                {group.items.map((item) => (
                  <li key={item.path}>
                    <Tooltip>
                      <TooltipTrigger>
                        <NavLink 
                          to={item.path}
                          onClick={() => { if(window.innerWidth < 1024) setIsMobileOpen(false); }}
                          className={({ isActive }) => `
                            flex items-center px-6 py-3 transition-all duration-200 whitespace-nowrap outline-none relative group
                            ${isActive 
                              ? 'bg-honda-red/10 text-honda-red font-medium border-l-4 border-honda-red' 
                              : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900 font-medium border-l-4 border-transparent'
                            }
                            ${(isCollapsed && !isMobileOpen) ? 'justify-center px-0 border-none' : ''}
                          `}
                        >
                          {({ isActive }) => (
                            <>
                              <item.icon size={20} className={`flex-shrink-0 ${(isCollapsed && !isMobileOpen) ? '' : 'mr-4'} ${isActive ? 'text-honda-red' : 'text-gray-400 group-hover:text-gray-600'}`} />
                              {(!isCollapsed || isMobileOpen) && <span className="text-[14px]">{item.label}</span>}
                              {(!isCollapsed || isMobileOpen) && (group.header === '' || group.header === 'PAGES' || group.header === 'UI ELEMENTS' || group.header === 'FORMS & TABLES') && (
                                <ChevronRight size={14} className={`ml-auto hidden ${isActive ? 'text-honda-red/50' : 'text-gray-300'}`} />
                              )}
                            </>
                          )}
                        </NavLink>
                      </TooltipTrigger>
                      {(isCollapsed && !isMobileOpen) && (
                        <TooltipContent side="right" sideOffset={18} className="bg-gray-800 text-white border-none font-medium text-xs px-3 py-1.5 z-[150]">
                          {item.label}
                        </TooltipContent>
                      )}
                    </Tooltip>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>
      </motion.aside>
    </>
  );
};
