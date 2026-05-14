import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SkipBack, SkipForward, Play, Pause, Shuffle, Repeat, Heart, MoreVertical } from 'lucide-react';

const ExpandedPlayer = ({ 
  isExpanded, 
  setIsExpanded, 
  currentSong, 
  isPlaying, 
  togglePlay, 
  playNext, 
  playPrevious,
  currentTime,
  duration,
  handleSeek,
  favorites,
  toggleFavorite,
  formatTime
}) => {
  return (
    <AnimatePresence>
      {isExpanded && (
        <motion.div
          initial={{ opacity: 0, y: '100%' }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: '100%' }}
          transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          className="fixed inset-0 z-[100] bg-[#020617] flex flex-col p-8 md:p-16 overflow-hidden"
        >
          {/* Background Glow */}
          <div 
            className="absolute inset-0 opacity-20 blur-[120px]"
            style={{ background: `radial-gradient(circle at center, ${currentSong.color || '#6366f1'}, transparent)` }}
          />

          <header className="relative z-10 flex justify-between items-center mb-12">
            <button 
              onClick={() => setIsExpanded(false)}
              className="p-3 rounded-full bg-white/5 hover:bg-white/10 transition-colors"
            >
              <SkipBack className="rotate-90" />
            </button>
            <div className="text-center">
              <p className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-1">Playing from</p>
              <h3 className="font-bold text-white">{currentSong.album}</h3>
            </div>
            <button className="p-3 rounded-full bg-white/5 hover:bg-white/10 transition-colors">
              <MoreVertical />
            </button>
          </header>

          <main className="relative z-10 flex-1 flex flex-col md:flex-row items-center justify-center gap-12 md:gap-24">
            <motion.div 
              animate={{ rotate: isPlaying ? 360 : 0 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="w-64 h-64 md:w-[450px] md:h-[450px] rounded-[3rem] overflow-hidden shadow-[0_40px_100px_-20px_rgba(0,0,0,0.5)] border border-white/10"
            >
              <img src={currentSong.cover} alt={currentSong.title} className="w-full h-full object-cover" />
            </motion.div>

            <div className="flex-1 max-w-xl">
              <div className="flex justify-between items-end mb-8">
                <div>
                  <h1 className="text-4xl md:text-6xl font-black text-white mb-4 leading-tight">{currentSong.title}</h1>
                  <p className="text-xl md:text-2xl text-indigo-400 font-medium">{currentSong.artist}</p>
                </div>
                <button 
                  onClick={() => toggleFavorite(currentSong.id)}
                  className={`p-4 rounded-3xl bg-white/5 transition-all hover:scale-110 ${favorites.includes(currentSong.id) ? 'text-pink-500' : 'text-slate-400'}`}
                >
                  <Heart size={32} fill={favorites.includes(currentSong.id) ? "currentColor" : "none"} />
                </button>
              </div>

              {/* Progress */}
              <div className="space-y-4 mb-12">
                 <div className="h-2 bg-white/10 rounded-full relative group cursor-pointer overflow-hidden">
                    <input 
                      type="range"
                      min="0"
                      max={duration || 0}
                      value={currentTime}
                      onChange={(e) => handleSeek(parseFloat(e.target.value))}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                    />
                    <motion.div 
                      className="h-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-full"
                      style={{ width: `${(currentTime / duration) * 100 || 0}%` }}
                    />
                 </div>
                 <div className="flex justify-between text-sm font-bold text-slate-500 font-mono">
                    <span>{formatTime(currentTime)}</span>
                    <span>{formatTime(duration)}</span>
                 </div>
              </div>

              {/* Controls */}
              <div className="flex items-center justify-between">
                <button className="text-slate-500 hover:text-white transition-colors"><Shuffle size={24} /></button>
                <div className="flex items-center gap-8 md:gap-12">
                  <button onClick={playPrevious} className="text-white hover:scale-110 transition-transform"><SkipBack size={48} fill="currentColor" /></button>
                  <button 
                    onClick={togglePlay}
                    className="w-24 h-24 rounded-full bg-white text-black flex items-center justify-center hover:scale-105 active:scale-95 transition-all shadow-2xl"
                  >
                    {isPlaying ? <Pause size={40} fill="black" /> : <Play size={40} fill="black" className="ml-2" />}
                  </button>
                  <button onClick={playNext} className="text-white hover:scale-110 transition-transform"><SkipForward size={48} fill="currentColor" /></button>
                </div>
                <button className="text-slate-500 hover:text-white transition-colors"><Repeat size={24} /></button>
              </div>
            </div>
          </main>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ExpandedPlayer;
