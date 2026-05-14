import React from 'react';
import { Volume2, VolumeX } from 'lucide-react';

const VolumeControl = ({ volume, setVolume, isMuted, toggleMute }) => {
  return (
    <div className="flex items-center gap-2 group">
      <button onClick={toggleMute} className="text-slate-500 hover:text-white transition-colors">
        {isMuted || volume === 0 ? <VolumeX size={18} /> : <Volume2 size={18} />}
      </button>
      <div className="w-20 h-1 bg-white/10 rounded-full relative">
        <input 
          type="range"
          min="0"
          max="1"
          step="0.01"
          value={volume}
          onChange={(e) => setVolume(parseFloat(e.target.value))}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
        />
        <div 
          className="h-full bg-white/60 group-hover:bg-white rounded-full transition-colors" 
          style={{ width: `${volume * 100}%` }}
        />
      </div>
    </div>
  );
};

export default VolumeControl;
