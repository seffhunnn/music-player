import React from 'react';
import { motion } from 'framer-motion';
import { Music2, Globe, ArrowRight, Music } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();

  const handleGuestLogin = () => {
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-dark-deep flex items-center justify-center p-6 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute top-0 left-0 w-full h-full">
         <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-primary/20 blur-[120px] rounded-full animate-pulse-slow"></div>
         <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-accent-purple/20 blur-[120px] rounded-full animate-pulse-slow" style={{ animationDelay: '2s' }}></div>
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md relative z-10"
      >
        <div className="text-center mb-10">
          <div className="w-16 h-16 bg-gradient-to-br from-primary to-accent-purple rounded-2xl flex items-center justify-center shadow-2xl shadow-primary/30 mx-auto mb-6 rotate-12">
            <Music2 className="text-white" size={32} />
          </div>
          <h1 className="text-4xl font-black mb-2 tracking-tight">Welcome to <span className="text-gradient">WaveSync</span></h1>
          <p className="text-slate-400">Your music, synced across all devices.</p>
        </div>

        <div className="glass p-8 rounded-[2.5rem] border border-white/10 shadow-2xl">
          <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
            <div>
              <label className="block text-sm font-semibold text-slate-400 mb-2">Email Address</label>
              <input 
                type="email" 
                placeholder="name@example.com"
                className="w-full bg-white/5 border border-white/10 rounded-xl py-4 px-6 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-400 mb-2">Password</label>
              <input 
                type="password" 
                placeholder="••••••••"
                className="w-full bg-white/5 border border-white/10 rounded-xl py-4 px-6 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
              />
            </div>
            <div className="flex justify-end">
               <a href="#" className="text-xs text-primary-light hover:underline font-medium">Forgot password?</a>
            </div>

            <button 
              onClick={handleGuestLogin}
              className="w-full py-4 rounded-xl bg-gradient-to-r from-primary to-accent-purple text-white font-bold shadow-lg shadow-primary/20 hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-2"
            >
              Sign In <ArrowRight size={18} />
            </button>
          </form>

          <div className="mt-8 relative">
             <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-white/10"></div>
             </div>
             <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-dark-deep px-2 text-slate-500 backdrop-blur-sm">Or continue with</span>
             </div>
          </div>

          <div className="grid grid-cols-2 gap-4 mt-8">
             <button className="flex items-center justify-center gap-2 py-3 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors">
                <Globe size={18} /> Google
             </button>
             <button className="flex items-center justify-center gap-2 py-3 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors">
                <Music size={18} /> GitHub
             </button>
          </div>

          <button 
            onClick={handleGuestLogin}
            className="w-full mt-6 py-3 rounded-xl bg-transparent border border-white/5 text-slate-400 hover:text-white hover:bg-white/5 transition-all text-sm font-semibold"
          >
            Continue as Guest
          </button>
        </div>

        <p className="text-center mt-8 text-slate-500 text-sm">
          Don't have an account? <Link to="/signup" className="text-primary-light hover:underline font-bold">Sign up</Link>
        </p>
      </motion.div>
    </div>
  );
};

export default Login;
