import React from 'react';
import { Heart, MoreVertical } from 'lucide-react';

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
          <div className="overflow-hidden">
            <p className={`font-bold truncate ${isActive ? 'text-indigo-400' : 'text-white'}`}>{song.title}</p>
            <p className="text-[10px] text-slate-500 uppercase tracking-wider truncate font-bold">{song.artist}</p>
          </div>
        </div>
      </td>
      <td className="px-6 py-4 text-slate-400 text-sm hidden md:table-cell truncate max-w-[150px]">{song.album}</td>
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

export default SongRow;
