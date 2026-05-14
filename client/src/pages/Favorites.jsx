import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { Heart, Play, Clock } from 'lucide-react';
import { mockSongs } from '../data/mockSongs';
import useMusicStore from '../store/useMusicStore';
import SongRow from './Library'; // I'll refactor this to be shared

// Wait! I should move SongRow to components to avoid circular or weird imports.
// Actually, I'll just create a shared Table component later. 
// For now, I'll keep it simple and clean in Favorites.

const Favorites = () => {
  const { 
    setCurrentSong, 
    setQueue, 
    favorites, 
    uploadedSongs, 
    toggleFavorite,
    isPlaying,
    currentSong
  } = useMusicStore();
  
  const allSongs = useMemo(() => [...mockSongs, ...uploadedSongs], [uploadedSongs]);
  const likedSongs = useMemo(() => allSongs.filter(song => favorites.includes(song.id)), [allSongs, favorites]);

  const handlePlayAll = () => {
    if (likedSongs.length > 0) {
      setCurrentSong(likedSongs[0]);
      setQueue(likedSongs);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-12 pb-20"
    >
      <div className="flex flex-col md:flex-row items-center md:items-end gap-10 mb-16">
        <div className="w-64 h-64 rounded-[3rem] bg-gradient-to-br from-pink-500 via-purple-600 to-indigo-700 flex items-center justify-center shadow-[0_20px_50px_rgba(236,72,153,0.3)] relative group">
          <Heart size={100} fill="white" className="text-white drop-shadow-2xl group-hover:scale-110 transition-transform duration-500" />
          <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity rounded-[3rem]"></div>
        </div>
        
        <div className="text-center md:text-left">
          <p className="text-xs font-black uppercase tracking-[0.3em] text-slate-500 mb-3 ml-1">Playlist</p>
          <h1 className="text-6xl md:text-8xl font-black text-white mb-8 tracking-tighter">Liked Songs</h1>
          <div className="flex items-center justify-center md:justify-start gap-6 text-sm font-bold text-slate-400">
             <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center overflow-hidden border border-white/10">
                   <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" alt="avatar" />
                </div>
                <span className="text-white">Guest User</span>
             </div>
             <div className="w-1.5 h-1.5 rounded-full bg-slate-700"></div>
             <span className="uppercase tracking-widest">{likedSongs.length} tracks</span>
          </div>
        </div>
      </div>

      <div className="flex gap-6 mb-12">
        <button 
          onClick={handlePlayAll}
          disabled={likedSongs.length === 0}
          className="bg-white text-black px-10 py-4 rounded-2xl font-black flex items-center gap-3 hover:bg-indigo-100 transition-all hover:scale-105 active:scale-95 shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Play size={24} fill="black" /> Play All
        </button>
        <button className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 transition-colors group">
          <Heart size={24} fill="#ec4899" className="text-pink-500 group-hover:scale-110 transition-transform" />
        </button>
      </div>

      {likedSongs.length > 0 ? (
        <div className="glass rounded-[3rem] overflow-hidden border border-white/5 shadow-2xl">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="text-slate-500 text-xs border-b border-white/5 uppercase tracking-[0.2em]">
                <th className="px-8 py-5 font-black w-20 text-center">#</th>
                <th className="px-6 py-5 font-black">Title</th>
                <th className="px-6 py-5 font-black hidden md:table-cell">Album</th>
                <th className="px-6 py-5 font-black text-right pr-12"><Clock size={16} className="ml-auto" /></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {likedSongs.map((song, index) => (
                <tr 
                  key={song.id} 
                  onClick={() => { setCurrentSong(song); setQueue(likedSongs); }}
                  className={`group hover:bg-white/5 transition-colors cursor-pointer ${currentSong?.id === song.id ? 'bg-indigo-500/10' : ''}`}
                >
                  <td className="px-8 py-5 text-slate-500 group-hover:text-white font-mono text-center">
                    {currentSong?.id === song.id && isPlaying ? (
                       <div className="flex items-end justify-center gap-[2px] h-4">
                          <div className="equalizer-bar" style={{ animationDelay: '0s' }}></div>
                          <div className="equalizer-bar" style={{ animationDelay: '0.2s' }}></div>
                          <div className="equalizer-bar" style={{ animationDelay: '0.4s' }}></div>
                       </div>
                    ) : (
                      String(index + 1).padStart(2, '0')
                    )}
                  </td>
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-4">
                      <img src={song.cover} alt={song.title} className="w-12 h-12 rounded-xl object-cover shadow-lg" loading="lazy" />
                      <div>
                        <p className={`font-black ${currentSong?.id === song.id ? 'text-indigo-400' : 'text-white'}`}>{song.title}</p>
                        <p className="text-xs text-slate-500 font-bold uppercase tracking-widest">{song.artist}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-5 text-slate-500 text-sm hidden md:table-cell font-medium">{song.album}</td>
                  <td className="px-6 py-5 text-right pr-12">
                     <div className="flex items-center justify-end gap-6 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button 
                          onClick={(e) => { e.stopPropagation(); toggleFavorite(song.id); }}
                          className="text-pink-500 hover:scale-120 transition-transform"
                        >
                          <Heart size={20} fill="currentColor" />
                        </button>
                        <span className="text-slate-500 text-xs font-mono font-bold">3:45</span>
                     </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="py-32 text-center glass rounded-[3rem] border border-white/5">
          <Heart size={64} className="text-slate-800 mx-auto mb-6" />
          <h2 className="text-2xl font-black text-white mb-2">No liked songs yet</h2>
          <p className="text-slate-500 max-w-sm mx-auto">Start building your favorites collection by clicking the heart icon on any track.</p>
        </div>
      )}
    </motion.div>
  );
};

export default Favorites;
