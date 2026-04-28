import { useState, useRef, useEffect } from 'react';
import { Search, Bell, LogOut, Moon, Grid, Menu } from 'lucide-react';
import { useAppSelector, useAppDispatch } from '../../store/hooks';
import { logout } from '../../store/slices/authSlice';
import { motion, AnimatePresence } from 'framer-motion';

interface TopbarProps {
  onMenuClick: () => void;
}

export const Topbar = ({ onMenuClick }: TopbarProps) => {
  const { user } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsProfileOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <header className="h-16 w-full flex items-center justify-between px-4 sm:px-6 bg-white border-b border-gray-100 z-40 transition-colors">
      
      {/* Left side: Hamburger (Mobile Only) & Search Input */}
      <div className="flex items-center flex-1 max-w-xl gap-4">
        <button 
          onClick={onMenuClick}
          className="p-2 text-gray-500 hover:text-gray-800 hover:bg-gray-50 rounded-md transition-colors outline-none cursor-pointer"
        >
          <Menu size={20} />
        </button>

        {/* Re-integrated Structural Search Bar for Light Theme */}
        <div className="relative w-full group hidden sm:block max-w-sm">
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400 group-focus-within:text-honda-red transition-colors">
            <Search size={16} />
          </div>
          <input
            type="text"
            placeholder="Search parts, barcodes, or users..."
            className="w-full bg-gray-50 border border-gray-200 rounded-lg py-2 pl-10 pr-12 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-honda-red/50 focus:border-honda-red/50 focus:bg-white transition-all font-sans"
          />
          <div className="absolute inset-y-0 right-0 pr-2.5 flex items-center pointer-events-none">
            <kbd className="hidden md:inline-flex items-center gap-1 bg-white border border-gray-200 rounded px-1.5 py-0.5 text-[10px] font-medium text-gray-400 shadow-sm">
              <span className="text-[10px]">⌘</span>K
            </kbd>
          </div>
        </div>
      </div>

      {/* Right side: Actions & Profile */}
      <div className="flex items-center gap-1 sm:gap-3 ml-4">
        
        {/* Action Icons */}
        <button className="p-2 text-gray-400 hover:text-gray-700 hover:bg-gray-50 rounded-md transition-colors cursor-pointer outline-none sm:hidden">
          <Search size={20} />
        </button>
       
        <button className="relative p-2 text-gray-400 hover:text-gray-700 hover:bg-gray-50 rounded-md transition-colors cursor-pointer outline-none">
          <Bell size={20} />
          <span className="absolute top-2 right-2 w-2 h-2 bg-honda-red rounded-full border-2 border-white" />
        </button>

        {/* User Profile */}
        <div className="relative ml-1 sm:ml-2" ref={dropdownRef}>
          <button 
            onClick={() => setIsProfileOpen(!isProfileOpen)}
            className="flex items-center gap-2 rounded-full cursor-pointer outline-none"
          >
            <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full overflow-hidden border border-gray-200">
              <img src={`https://ui-avatars.com/api/?name=${user?.name || user?.email?.split('@')[0] || 'A'}&background=cc0000&color=fff`} alt="User avatar" className="w-full h-full object-cover" />
            </div>
          </button>

          {/* Profile Dropdown */}
          <AnimatePresence>
            {isProfileOpen && (
              <motion.div 
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -10, scale: 0.95 }}
                transition={{ duration: 0.2 }}
                className="absolute right-0 mt-3 w-56 rounded-lg bg-white border border-gray-100 shadow-xl overflow-hidden z-[100] origin-top-right"
              >
                <div className="px-4 py-3 border-b border-gray-100 bg-gray-50/50">
                  <p className="text-sm font-semibold text-gray-800">{user?.email}</p>
                  <p className="text-[11px] text-gray-500 uppercase tracking-wide mt-0.5">{user?.role?.replace('_', ' ')}</p>
                </div>
                <div className="p-1.5">
                  <button 
                    onClick={handleLogout}
                    className="w-full flex items-center gap-3 px-3 py-2 rounded-md text-red-600 hover:bg-red-50 transition-colors text-sm font-medium cursor-pointer outline-none"
                  >
                    <LogOut size={16} />
                    Sign Out
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </header>
  );
};
