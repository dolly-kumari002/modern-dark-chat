import { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { motion } from 'framer-motion';
import { MessageSquareCode } from 'lucide-react';
import axios from 'axios';

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('test@example.com');
  const [password, setPassword] = useState('password123');
  const [username, setUsername] = useState('testuser');
  
  const { login } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const endpoint = isLogin ? '/api/auth/login' : '/api/auth/signup';
      const payload = isLogin ? { email, password } : { username, email, password };
      
      const baseUrl = import.meta.env.PROD ? '' : 'http://localhost:5000';
      const { data } = await axios.post(`${baseUrl}${endpoint}`, payload);
      login(data);
    } catch (error) {
      alert(error.response?.data?.message || 'Authentication failed');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-dark-900 p-4">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md p-8 rounded-2xl bg-dark-800 border border-dark-700 shadow-2xl"
      >
        <div className="flex flex-col items-center mb-8">
          <div className="p-3 rounded-full bg-brand-500/20 text-brand-500 mb-4">
            <MessageSquareCode size={32} />
          </div>
          <h2 className="text-2xl font-bold text-white">
            {isLogin ? 'Welcome Back' : 'Create Account'}
          </h2>
          <p className="text-gray-400 mt-2 text-sm">
            {isLogin ? 'Sign in to jump back into your chats.' : 'Sign up to connect with friends.'}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {!isLogin && (
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-1">Username</label>
              <input 
                type="text" 
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-dark-900 border border-dark-700 focus:border-brand-500 focus:ring-1 focus:ring-brand-500 outline-none transition-all text-white"
                required
              />
            </div>
          )}
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-1">Email</label>
            <input 
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-dark-900 border border-dark-700 focus:border-brand-500 focus:ring-1 focus:ring-brand-500 outline-none transition-all text-white"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-1">Password</label>
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-dark-900 border border-dark-700 focus:border-brand-500 focus:ring-1 focus:ring-brand-500 outline-none transition-all text-white"
              required
            />
          </div>

          <button 
            type="submit" 
            className="w-full py-3 px-4 bg-brand-500 hover:bg-brand-400 text-white font-medium rounded-xl transition-colors mt-2"
          >
            {isLogin ? 'Sign In' : 'Sign Up'}
          </button>
        </form>

        <p className="text-center text-sm text-gray-400 mt-6">
          {isLogin ? "Don't have an account? " : "Already have an account? "}
          <button 
            type="button"
            onClick={() => setIsLogin(!isLogin)} 
            className="text-brand-500 hover:text-brand-400 font-medium transition-colors"
          >
            {isLogin ? 'Sign up' : 'Sign in'}
          </button>
        </p>
      </motion.div>
    </div>
  );
};

export default Login;
