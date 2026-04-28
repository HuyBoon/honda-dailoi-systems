import { useState, useEffect } from 'react';
import { useNavigate, Link, useSearchParams } from 'react-router-dom';
import { useAppDispatch } from '../store/hooks';
import { loginSuccess } from '../store/slices/authSlice';
import { useLoginMutation } from '../store/api/authApiSlice';
import { motion } from 'framer-motion';

export const Login = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [login, { isLoading }] = useLoginMutation();
  const [errorText, setErrorText] = useState('');

  const [email, setEmail] = useState('hondadailoi@gmail.com');
  const [password, setPassword] = useState('dailoi2026');

  useEffect(() => {
    if (searchParams.get('error') === 'unauthorized') {
      setErrorText('Access Denied: You do not have administrative privileges.');
    }
  }, [searchParams]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorText('');
    
    try {
      const response = await login({ email, password }).unwrap();
      
      // Inline verification
      if (!['ADMIN', 'SUPER_ADMIN', 'MANAGER'].includes(response.user.role)) {
         setErrorText('Access Denied: You do not have administrative privileges.');
         return;
      }

      dispatch(
        loginSuccess({
          user: response.user,
          token: response.access_token,
        })
      );
      navigate('/');
    } catch (err: any) {
      setErrorText(err.data?.message || 'Failed to login. Please check your credentials.');
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="w-full bg-honda-gray/50 backdrop-blur-xl border border-white/10 p-8 sm:p-10 rounded-2xl shadow-2xl"
    >
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-white tracking-wide">Sign In to Dashboard</h2>
        <p className="text-sm text-honda-light/60 mt-2">Enter your credentials to manage inventory.</p>
      </div>

      <form onSubmit={handleLogin} className="space-y-5">
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-white/80 mb-1.5">
            Email Address
          </label>
          <input 
            type="email" 
            id="email" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required 
            className="w-full px-4 py-3 bg-black/40 border border-white/10 rounded-xl text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-honda-red/50 focus:border-honda-red/50 transition-all"
            placeholder="admin@honda.com"
          />
        </div>

        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label htmlFor="password" className="block text-sm font-medium text-white/80">
              Password
            </label>
            <a href="#" className="text-xs text-honda-red hover:text-honda-red/80 transition-colors">
              Forgot password?
            </a>
          </div>
          <input 
            type="password" 
            id="password" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required 
            className="w-full px-4 py-3 bg-black/40 border border-white/10 rounded-xl text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-honda-red/50 focus:border-honda-red/50 transition-all"
            placeholder="••••••••"
          />
        </div>
        
        {errorText && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }} 
            animate={{ opacity: 1, height: 'auto' }} 
            className="text-red-400 text-sm font-medium bg-red-400/10 border border-red-400/20 p-3 rounded-lg"
          >
            {errorText}
          </motion.div>
        )}

        <motion.button 
          type="submit" 
          disabled={isLoading}
          whileHover={{ scale: isLoading ? 1 : 1.01 }}
          whileTap={{ scale: isLoading ? 1 : 0.99 }}
          className={`w-full py-3.5 px-4 bg-honda-red hover:bg-honda-red/90 text-white font-semibold rounded-xl shadow-lg transition-all flex justify-center items-center ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
        >
          {isLoading ? (
            <span className="flex items-center gap-2">
              <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Signing In...
            </span>
          ) : 'Sign In'}
        </motion.button>
      </form>

      <p className="mt-6 text-center text-sm text-honda-light/60">
        Don't have an account?{' '}
        <Link to="/register" className="text-honda-red font-medium hover:underline transition-all">
          Create one now
        </Link>
      </p>
    </motion.div>
  );
};
