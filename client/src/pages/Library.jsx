import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Clock, MoreVertical, ListFilter, Search } from 'lucide-react';
import { mockSongs } from '../data/mockSongs';
import useMusicStore from '../store/useMusicStore';

const SongRow = ({ song, index, isActive, isPlaying, onPlay, isFavorite, onToggleFavorite }) => {
  return (
    <tr 
      onClick={() => onPlay(song)}
      className={`group hover:bg-white/5 transition-colors cursor-pointer ${isActive ? 'bg-indigo-500/10' : ''}`}
    >
      <td className="px-6 py-4 w-12 text-slate-500 group-hover:text-white font-mono">
        {isActive && isPlaying ? (
          <div className="flex items-end gap-[2px] h-4 w-4">
            <div className="equalizer-bar" style={{ animationDelay: '0s' }}></div>
            <div className="equalizer-bar" style={{ animationDelay: '0.2s' }}></div>
            <div className="equalizer-bar" style={{ animationDelay: '0.4s' }}></div>
          </div>
        ) : (
          String(index + 1).padStart(2, '0')
        )}
      </td>
      <td className="px-6 py-4">
        <div className="flex items-center gap-4">
          <img src={song.cover} alt={song.title} className="w-10 h-10 rounded-lg object-cover shadow-lg" loading="lazy" />
          <div>
            <p className={`font-bold ${isActive ? 'text-indigo-400' : 'text-white'}`}>{song.title}</p>
            <p className="text-xs text-slate-400 uppercase tracking-wider">{song.artist}</p>
          </div>
        </div>
      </td>
      <td className="px-6 py-4 text-slate-400 text-sm hidden md:table-cell">{song.album}</td>
      <td className="px-6 py-4 text-slate-500 text-sm hidden sm:table-cell font-medium">May 14, 2026</td>
      <td className="px-6 py-4">
         <div className="flex items-center justify-end gap-4 opacity-0 group-hover:opacity-100 transition-opacity">
            <button 
              onClick={(e) => { e.stopPropagation(); onToggleFavorite(song.id); }}
              className={`transition-colors ${isFavorite ? 'text-pink-500' : 'text-slate-500 hover:text-pink-500'}`}
            >
              <Heart size={18} fill={isFavorite ? "currentColor" : "none"} />
            </button>
            <button className="text-slate-500 hover:text-white transition-colors">
              <MoreVertical size={18} />
            </button>
            <span className="text-slate-500 text-xs w-10 text-right font-mono">4:12</span>
         </div>
      </td>
    </tr>
  );
};

const Library = () => {
  const { 
    setCurrentSong, 
    setQueue, 
    currentSong, 
    isPlaying,
    searchQuery,
    uploadedSongs,
    favorites,
    toggleFavorite
  } = useMusicStore();

  const allSongs = [...mockSongs, ...uploadedSongs];
  const filteredSongs = allSongs.filter(song => 
    song.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    song.artist.toLowerCase().includes(searchQuery.toLowerCase()) ||
    song.album.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-8 pb-20"
    >
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-4xl font-black text-white mb-2">Your Library</h1>
          <p className="text-slate-400">Manage your music collection and uploads.</p>
        </div>
        <div className="flex gap-3">
          <button className="p-3 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors">
            <ListFilter size={20} className="text-slate-400" />
          </button>
          <button className="p-3 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors">
            <Search size={20} className="text-slate-400" />
          </button>
        </div>
      </div>

      <div className="glass rounded-[2.5rem] overflow-hidden border border-white/5 shadow-2xl">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="text-slate-500 text-xs border-b border-white/5 uppercase tracking-[0.2em]">
              <th className="px-6 py-5 font-black w-16 text-center">#</th>
              <th className="px-6 py-5 font-black">Title</th>
              <th className="px-6 py-5 font-black hidden md:table-cell">Album</th>
              <th className="px-6 py-5 font-black hidden sm:table-cell">Date Added</th>
              <th className="px-6 py-5 font-black text-right pr-12"><Clock size={16} className="ml-auto" /></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {filteredSongs.map((song, index) => (
              <SongRow 
                key={song.id}
                song={song}
                index={index}
                isActive={currentSong?.id === song.id}
                isPlaying={isPlaying}
                onPlay={(s) => { setCurrentSong(s); setQueue(filteredSongs); }}
                isFavorite={favorites.includes(song.id)}
                onToggleFavorite={toggleFavorite}
              />
            ))}
          </tbody>
        </table>
        
        {filteredSongs.length === 0 && (
          <div className="py-20 text-center">
            <p className="text-slate-500 font-medium">No songs found in your library.</p>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default Library;
