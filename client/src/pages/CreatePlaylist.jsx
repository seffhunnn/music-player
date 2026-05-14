import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Music2, CheckCircle2 } from 'lucide-react';
import useMusicStore from '../store/useMusicStore';
import { useNavigate } from 'react-router-dom';

const CreatePlaylist = () => {
  const [name, setName] = useState('');
  const { createPlaylist } = useMusicStore();
  const navigate = useNavigate();
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim()) return;

    createPlaylist(name);
    setSuccess(true);
    setTimeout(() => {
      navigate('/library');
    }, 1500);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="max-w-2xl mx-auto py-12"
    >
      <div className="glass p-10 rounded-[3rem] border border-white/10 text-center">
        <div className="w-24 h-24 bg-gradient-to-br from-primary to-accent-purple rounded-[2rem] flex items-center justify-center mx-auto mb-8 shadow-2xl shadow-primary/30">
          <Music2 className="text-white" size={40} />
        </div>
        
        <h1 className="text-4xl font-black mb-4">Create New Playlist</h1>
        <p className="text-slate-400 mb-10">Give your collection a name and start adding your favorite tracks.</p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="relative">
            <input 
              type="text" 
              placeholder="Playlist Name"
              className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 text-xl focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all text-center font-bold"
              value={name}
              onChange={(e) => setName(e.target.value)}
              autoFocus
            />
          </div>

          <button 
            type="submit"
            disabled={!name.trim() || success}
            className={`
              w-full py-4 rounded-2xl font-bold text-lg flex items-center justify-center gap-2 transition-all
              ${!name.trim() || success
                ? 'bg-slate-800 text-slate-500 cursor-not-allowed' 
                : 'bg-white text-black hover:bg-slate-200 hover:scale-[1.02] active:scale-95 shadow-xl'}
            `}
          >
             {success ? (
              <>
                <CheckCircle2 className="text-emerald-500" /> Created!
              </>
            ) : (
              <>
                <Plus size={20} /> Create Playlist
              </>
            )}
          </button>
        </form>
      </div>
    </motion.div>
  );
};

export default CreatePlaylist;
