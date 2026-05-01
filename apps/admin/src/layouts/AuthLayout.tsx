import { Outlet, Navigate } from 'react-router-dom';
import { useAppSelector } from '../store/hooks';

export const AuthLayout = () => {
  const { isAuthenticated } = useAppSelector((state) => state.auth);

  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="flex min-h-screen bg-honda-dark text-white font-sans">
      {/* Left side: Premium Image */}
      <div className="hidden lg:flex lg:w-1/2 relative bg-black">
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent z-10 pointer-events-none" />
        <img 
          src="/honda_parts_background.png" 
          alt="Honda Premium Parts" 
          className="object-cover w-full h-full opacity-80"
        />
        <div className="absolute bottom-12 left-12 z-20 max-w-md">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-10 h-1 bg-honda-red rounded-full" />
            <span className="uppercase tracking-widest text-honda-red font-bold text-sm">Genuine Parts</span>
          </div>
          <h1 className="text-4xl font-bold mb-2">Honda Dai Loi</h1>
          <p className="text-honda-light/70 text-lg">
            Streamlined spare parts management system designed for maximum efficiency and scale.
          </p>
        </div>
      </div>
      
      {/* Right side: Auth Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 sm:p-12">
        <div className="w-full max-w-md">
          <Outlet />
        </div>
      </div>
    </div>
  );
};
