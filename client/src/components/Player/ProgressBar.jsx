import React from 'react';
import { motion } from 'framer-motion';

const ProgressBar = ({ currentTime, duration, onSeek }) => {
  const formatTime = (time) => {
    if (isNaN(time)) return "0:00";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  const percentage = (currentTime / duration) * 100 || 0;

  return (
    <div className="w-full flex items-center gap-3">
      <span className="text-[10px] font-medium text-slate-500 w-8 text-right font-mono">{formatTime(currentTime)}</span>
      <div className="flex-1 h-1 bg-white/10 rounded-full relative group cursor-pointer">
        <input 
          type="range"
          min="0"
          max={duration || 0}
          value={currentTime}
          onChange={(e) => onSeek(parseFloat(e.target.value))}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
        />
        <div 
          className="h-full bg-gradient-to-r from-primary to-accent-purple rounded-full relative transition-all"
          style={{ width: `${percentage}%` }}
        >
          <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 bg-white rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity" />
        </div>
      </div>
      <span className="text-[10px] font-medium text-slate-500 w-8 font-mono">{formatTime(duration)}</span>
    </div>
  );
};

export default ProgressBar;
