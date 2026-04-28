import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Sidebar } from '../components/Sidebar/Sidebar';
import { Topbar } from '../components/Topbar/Topbar';
import { TooltipProvider } from '../components/ui/tooltip';

export const AdminLayout = () => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleMenuClick = () => {
    if (window.innerWidth < 1024) {
      setIsMobileMenuOpen(true);
    } else {
      setIsSidebarCollapsed(!isSidebarCollapsed);
    }
  };

  return (
    <TooltipProvider>
      <div className="flex min-h-screen bg-[#f4f6f8] font-sans relative overflow-hidden">
      <Sidebar 
        isCollapsed={isSidebarCollapsed} 
        isMobileOpen={isMobileMenuOpen}
        setIsMobileOpen={setIsMobileMenuOpen}
      />
      <main className="flex-1 flex flex-col h-screen overflow-hidden relative z-10 w-full">
        <Topbar 
          onMenuClick={handleMenuClick} 
        />
        
        {/* Scrollable content area */}
        <div className="flex-1 overflow-y-auto w-full relative">
          <Outlet />
        </div>
      </main>
    </div>
    </TooltipProvider>
  );
};
