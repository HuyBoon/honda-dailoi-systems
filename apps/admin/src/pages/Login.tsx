import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../store/hooks';
import { loginSuccess } from '../store/slices/authSlice';
import { motion } from 'framer-motion';
import './Login.css';

export const Login = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate API call
    setTimeout(() => {
      dispatch(
        loginSuccess({
          user: { id: '1', name: 'Admin User', email: 'admin@honda.com', role: 'admin' },
          token: 'dummy_token_123',
        })
      );
      navigate('/');
    }, 500);
  };

  return (
    <div className="login-container">
      <motion.div 
        className="login-card glass-panel"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="login-header">
          <h2>Honda Dai Loi</h2>
          <p>Admin Portal</p>
        </div>
        <form onSubmit={handleLogin} className="login-form">
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input type="email" id="email" defaultValue="admin@honda.com" required className="glass-input" />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input type="password" id="password" defaultValue="password" required className="glass-input" />
          </div>
          <motion.button 
            type="submit" 
            className="login-button"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Sign In
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
};
