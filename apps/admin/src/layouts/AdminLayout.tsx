import { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { Sidebar } from '../components/Sidebar/Sidebar';
import { Topbar } from '../components/Topbar/Topbar';
import { TooltipProvider } from '../components/ui/tooltip';
import { Toaster } from 'react-hot-toast';

export const AdminLayout = () => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleMenuToggle = () => {
    if (window.innerWidth < 1024) {
      setIsMobileMenuOpen(true);
    } else {
      setIsSidebarCollapsed(!isSidebarCollapsed);
    }
  };

  return (
    <TooltipProvider>
      <Toaster position="top-right" />
      <div className="min-h-screen bg-gray-50/50 font-sans">
        
        <Sidebar 
          isCollapsed={isSidebarCollapsed} 
          isMobileOpen={isMobileMenuOpen}
          setIsMobileOpen={setIsMobileMenuOpen}
        />

        <main 
          className={`transition-all duration-300 ease-in-out min-h-screen flex flex-col relative z-10 
            ${isSidebarCollapsed ? 'lg:ml-[80px]' : 'lg:ml-[260px]'}`}
        >
          <Topbar onMenuClick={handleMenuToggle} />
          
          <div className="flex-1 p-4 md:p-6 overflow-x-hidden">
            <Outlet />
          </div>
        </main>

      </div>
    </TooltipProvider>
  );
};