import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useRegisterMutation } from '../store/api/authApiSlice';
import { motion } from 'framer-motion';

export const Register = () => {
  const navigate = useNavigate();
  const [register, { isLoading }] = useRegisterMutation();
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorText, setErrorText] = useState('');
  const [successText, setSuccessText] = useState('');

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorText('');
    setSuccessText('');
    
    if (password !== confirmPassword) {
      setErrorText('Passwords do not match');
      return;
    }

    try {
      // The register endpoint returns the user without the access token typically.
      // Or we can just redirect to login upon success.
      await register({ email, password }).unwrap();
      
      setSuccessText('Account created successfully! Redirecting...');
      setTimeout(() => {
        navigate('/login');
      }, 1500);
      
    } catch (err: any) {
      setErrorText(err.data?.message || 'Failed to create account. Please try again.');
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      className="w-full bg-honda-gray/50 backdrop-blur-xl border border-white/10 p-8 sm:p-10 rounded-2xl shadow-2xl"
    >
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-white tracking-wide">Register Admin</h2>
        <p className="text-sm text-honda-light/60 mt-2">Create a secure management account.</p>
      </div>

      <form onSubmit={handleRegister} className="space-y-5">
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
            placeholder="newadmin@honda.com"
          />
        </div>

        <div>
          <label htmlFor="password" className="block text-sm font-medium text-white/80 mb-1.5">
            Password
          </label>
          <input 
            type="password" 
            id="password" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required 
            minLength={6}
            className="w-full px-4 py-3 bg-black/40 border border-white/10 rounded-xl text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-honda-red/50 focus:border-honda-red/50 transition-all"
            placeholder="••••••••"
          />
        </div>

        <div>
          <label htmlFor="confirmPassword" className="block text-sm font-medium text-white/80 mb-1.5">
            Confirm Password
          </label>
          <input 
            type="password" 
            id="confirmPassword" 
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required 
            minLength={6}
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

        {successText && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }} 
            animate={{ opacity: 1, height: 'auto' }} 
            className="text-green-400 text-sm font-medium bg-green-400/10 border border-green-400/20 p-3 rounded-lg"
          >
            {successText}
          </motion.div>
        )}

        <motion.button 
          type="submit" 
          disabled={isLoading || successText !== ''}
          whileHover={{ scale: isLoading ? 1 : 1.01 }}
          whileTap={{ scale: isLoading ? 1 : 0.99 }}
          className={`w-full py-3.5 px-4 bg-honda-red hover:bg-honda-red/90 text-white font-semibold rounded-xl shadow-lg transition-all flex justify-center items-center ${(isLoading || successText) ? 'opacity-70 cursor-not-allowed' : ''}`}
        >
          {isLoading ? (
            <span className="flex items-center gap-2">
              <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Creating Account...
            </span>
          ) : 'Register Account'}
        </motion.button>
      </form>

      <p className="mt-6 text-center text-sm text-honda-light/60">
        Already have an account?{' '}
        <Link to="/login" className="text-honda-red font-medium hover:underline transition-all">
          Sign In
        </Link>
      </p>
    </motion.div>
  );
};
