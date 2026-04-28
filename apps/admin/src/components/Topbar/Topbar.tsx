import { useState, useRef, useEffect } from 'react';
import { Search, Bell, LogOut, Menu } from 'lucide-react';
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
    <header className="h-16 sticky top-0 w-full flex items-center justify-between px-4 sm:px-6 bg-white border-b border-gray-200 z-40 shadow-sm">
      
      <div className="flex items-center flex-1 max-w-xl gap-4">
        {/* Nút Hamburger: Gọi hàm toggle truyền từ Layout */}
        <button 
          onClick={onMenuClick}
          className="p-2 -ml-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors outline-none cursor-pointer"
        >
          <Menu size={22} />
        </button>

        <div className="relative w-full hidden sm:block max-w-md">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
            <Search size={18} />
          </div>
          <input
            type="text"
            placeholder="Search parts, barcodes, or users..."
            className="w-full bg-gray-50/50 border border-gray-200 rounded-lg py-2 pl-10 pr-12 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-600/20 focus:border-red-600 transition-all"
          />
        </div>
      </div>

      <div className="flex items-center gap-2 sm:gap-4">
        <button className="relative p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-full transition-colors cursor-pointer outline-none">
          <Bell size={20} />
          <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-red-600 rounded-full border-2 border-white" />
        </button>

        <div className="relative" ref={dropdownRef}>
          <button 
            onClick={() => setIsProfileOpen(!isProfileOpen)}
            className="flex items-center gap-2 rounded-full cursor-pointer outline-none ring-2 ring-transparent hover:ring-red-100 transition-all"
          >
            <div className="w-9 h-9 rounded-full overflow-hidden bg-gray-100">
              <img src={`https://ui-avatars.com/api/?name=${user?.name || 'Admin'}&background=cc0000&color=fff`} alt="User avatar" className="w-full h-full object-cover" />
            </div>
          </button>

          <AnimatePresence>
            {isProfileOpen && (
              <motion.div 
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -10, scale: 0.95 }}
                transition={{ duration: 0.15 }}
                className="absolute right-0 mt-3 w-56 rounded-xl bg-white border border-gray-100 shadow-xl overflow-hidden z-[100] origin-top-right"
              >
                <div className="px-4 py-3 bg-gray-50/80 border-b border-gray-100">
                  <p className="text-sm font-semibold text-gray-800">{user?.name || 'Administrator'}</p>
                  <p className="text-xs text-gray-500 mt-0.5">{user?.email || 'admin@honda.com'}</p>
                </div>
                <div className="p-2">
                  <button 
                    onClick={handleLogout}
                    className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-red-600 hover:bg-red-50 transition-colors text-sm font-medium cursor-pointer outline-none"
                  >
                    <LogOut size={18} />
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