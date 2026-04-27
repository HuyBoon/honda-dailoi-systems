import { motion } from 'framer-motion';
import { useAppSelector } from '../store/hooks';
import './Dashboard.css';

export const Dashboard = () => {
  const { user } = useAppSelector((state) => state.auth);

  return (
    <motion.div 
      className="dashboard-container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <header className="dashboard-header">
        <h1>Welcome back, {user?.name}</h1>
        <p>Insights and overviews for your business</p>
      </header>

      <div className="dashboard-grid">
        <motion.div 
          className="stat-card glass-card"
          whileHover={{ y: -5 }}
        >
          <h3>Total Sales</h3>
          <p className="stat-value">$12,450</p>
          <span className="stat-trend positive">+4.5% from last month</span>
        </motion.div>
        
        <motion.div 
          className="stat-card glass-card"
          whileHover={{ y: -5 }}
        >
          <h3>New Users</h3>
          <p className="stat-value">1,240</p>
          <span className="stat-trend positive">+12% from last month</span>
        </motion.div>
        
        <motion.div 
          className="stat-card glass-card"
          whileHover={{ y: -5 }}
        >
          <h3>Low Stock Items</h3>
          <p className="stat-value">24</p>
          <span className="stat-trend negative">Requires attention</span>
        </motion.div>
      </div>
    </motion.div>
  );
};
