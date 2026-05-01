import { motion } from 'framer-motion';
import { Home, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#f4f6f8] flex flex-col items-center justify-center p-6 font-sans">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-md w-full bg-white rounded-2xl shadow-xl overflow-hidden"
      >
        <div className="h-2 bg-honda-red w-full"></div>
        <div className="p-8 md:p-10 flex flex-col items-center text-center">
          <div className="w-20 h-20 bg-honda-red/10 rounded-full flex items-center justify-center text-honda-red mb-6">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-10 h-10">
              <path d="M12 2L2 7l10 5 10-5-10-5z" />
              <path d="M2 17l10 5 10-5" />
              <path d="M2 12l10 5 10-5" />
            </svg>
          </div>
          
          <h1 className="text-6xl font-black text-gray-900 mb-2 tracking-tight">404</h1>
          <h2 className="text-xl font-bold text-gray-800 mb-4 uppercase tracking-wide">Page Not Found</h2>
          
          <p className="text-gray-500 mb-8 leading-relaxed">
            The system could not locate the module or part you are searching for. It may have been moved, deleted, or you might need different permissions.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-3 w-full">
            <button 
              onClick={() => navigate(-1)}
              className="flex-1 flex items-center justify-center gap-2 bg-gray-50 border border-gray-200 text-gray-700 px-4 py-2.5 rounded-lg font-medium hover:bg-gray-100 transition-colors shadow-sm cursor-pointer outline-none"
            >
              <ArrowLeft size={18} />
              Go Back
            </button>
            <button 
              onClick={() => navigate('/')}
              className="flex-1 flex items-center justify-center gap-2 bg-honda-red text-white px-4 py-2.5 rounded-lg font-medium shadow-md shadow-honda-red/20 hover:bg-honda-red/90 transition-colors cursor-pointer outline-none"
            >
              <Home size={18} />
              Dashboard
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
