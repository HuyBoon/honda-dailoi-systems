import { motion } from 'framer-motion';
import { useAppSelector } from '../store/hooks';

export const Dashboard = () => {
  const { user } = useAppSelector((state) => state.auth);

  return (
    <motion.div 
      className="p-8 text-white min-h-full"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <header className="mb-8">
        <h1 className="m-0 text-3xl font-bold tracking-tight">Welcome back, {user?.name || user?.email}</h1>
        <p className="mt-2 text-honda-light/60">Insights and overviews for your business</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <motion.div 
          className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 shadow-lg hover:border-white/20 transition-colors"
          whileHover={{ y: -5 }}
        >
          <h3 className="m-0 mb-4 text-base text-honda-light/60 font-medium">Total Sales</h3>
          <p className="m-0 mb-2 text-4xl font-bold">$12,450</p>
          <span className="text-sm font-medium text-green-400">+4.5% from last month</span>
        </motion.div>
        
        <motion.div 
          className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 shadow-lg hover:border-white/20 transition-colors"
          whileHover={{ y: -5 }}
        >
          <h3 className="m-0 mb-4 text-base text-honda-light/60 font-medium">New Users</h3>
          <p className="m-0 mb-2 text-4xl font-bold">1,240</p>
          <span className="text-sm font-medium text-green-400">+12% from last month</span>
        </motion.div>
        
        <motion.div 
          className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 shadow-lg hover:border-white/20 transition-colors"
          whileHover={{ y: -5 }}
        >
          <h3 className="m-0 mb-4 text-base text-honda-light/60 font-medium">Low Stock Items</h3>
          <p className="m-0 mb-2 text-4xl font-bold">24</p>
          <span className="text-sm font-medium text-red-400">Requires attention</span>
        </motion.div>
      </div>
    </motion.div>
  );
};
