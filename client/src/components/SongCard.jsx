import React from 'react';
import { motion } from 'framer-motion';
import { Play, Heart } from 'lucide-react';

const SongCard = ({ song, onPlay, isFavorite, onToggleFavorite }) => {
  return (
    <motion.div 
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -5 }}
      className="glass-card p-4 rounded-3xl group relative"
    >
      <div className="relative aspect-square rounded-2xl overflow-hidden mb-4 shadow-xl">
        <img 
          src={song.cover} 
          alt={song.title} 
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" 
          loading="lazy"
        />
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
          <button 
            onClick={() => onPlay(song)}
            className="w-12 h-12 rounded-full bg-indigo-500 text-white flex items-center justify-center shadow-lg hover:scale-110 transition-transform"
          >
            <Play size={24} fill="white" />
          </button>
        </div>
      </div>
      
      <h3 className="font-bold text-white truncate mb-1">{song.title}</h3>
      <p className="text-xs text-slate-400 truncate uppercase tracking-widest">{song.artist}</p>
      
      <button 
        onClick={(e) => {
          e.stopPropagation();
          onToggleFavorite(song.id);
        }}
        className={`absolute top-6 right-6 p-2 rounded-full bg-black/20 backdrop-blur-md opacity-0 group-hover:opacity-100 transition-opacity ${isFavorite ? 'opacity-100' : ''}`}
      >
        <Heart 
          size={16} 
          className={`${isFavorite ? 'fill-pink-500 text-pink-500' : 'text-white hover:text-pink-500'} transition-all`} 
        />
      </button>
    </motion.div>
  );
};

export default SongCard;
