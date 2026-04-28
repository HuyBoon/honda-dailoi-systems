import { Outlet } from 'react-router-dom';
import { Sidebar } from '../components/Sidebar/Sidebar';

export const AdminLayout = () => {
  return (
    <div className="flex min-h-screen bg-honda-dark text-white font-sans relative overflow-hidden">
      {/* Background radial gradients replacing CSS pseudo-elements */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-honda-red/5 rounded-full blur-[120px] pointer-events-none -z-10 translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-blue-900/5 rounded-full blur-[100px] pointer-events-none -z-10 -translate-x-1/2 translate-y-1/2" />
      
      <Sidebar />
      <main className="flex-1 h-screen overflow-y-auto relative z-10 w-full">
        <div className="w-full min-h-full">
          <Outlet />
        </div>
      </main>
    </div>
  );
};
