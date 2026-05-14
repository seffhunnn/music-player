import React, { useState, useEffect, useRef, useCallback } from 'react';
import { 
  Play, 
  Pause, 
  SkipBack, 
  SkipForward, 
  Repeat, 
  Shuffle,
  Maximize2,
  Heart,
  ListMusic
} from 'lucide-react';
import { motion } from 'framer-motion';
import useMusicStore from '../../store/useMusicStore';

// Sub-components
import ProgressBar from './ProgressBar';
import VolumeControl from './VolumeControl';
import ExpandedPlayer from './ExpandedPlayer';

const Player = () => {
  const { 
    currentSong, 
    isPlaying, 
    setIsPlaying, 
    playNext, 
    playPrevious,
    volume,
    setVolume,
    currentTime,
    setCurrentTime,
    duration,
    setDuration,
    favorites,
    toggleFavorite
  } = useMusicStore();

  const audioRef = useRef(null);
  const [isMuted, setIsMuted] = useState(false);
  const [prevVolume, setPrevVolume] = useState(volume);
  const [isExpanded, setIsExpanded] = useState(false);

  // Sync playback state with audio element
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.play().catch(err => console.warn("Playback prevented:", err));
    } else {
      audio.pause();
    }
  }, [isPlaying, currentSong]);

  // Sync volume state
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  // Handlers
  const togglePlay = useCallback(() => setIsPlaying(!isPlaying), [isPlaying, setIsPlaying]);
  
  const handleTimeUpdate = () => setCurrentTime(audioRef.current.currentTime);
  const handleLoadedMetadata = () => setDuration(audioRef.current.duration);

  const handleSeek = (time) => {
    if (audioRef.current) {
      audioRef.current.currentTime = time;
      setCurrentTime(time);
    }
  };

  const toggleMute = () => {
    if (isMuted) {
      setVolume(prevVolume);
      setIsMuted(false);
    } else {
      setPrevVolume(volume);
      setVolume(0);
      setIsMuted(true);
    }
  };

  const formatTime = (time) => {
    if (isNaN(time)) return "0:00";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  if (!currentSong) return null;

  return (
    <>
      <ExpandedPlayer 
        isExpanded={isExpanded}
        setIsExpanded={setIsExpanded}
        currentSong={currentSong}
        isPlaying={isPlaying}
        togglePlay={togglePlay}
        playNext={playNext}
        playPrevious={playPrevious}
        currentTime={currentTime}
        duration={duration}
        handleSeek={handleSeek}
        favorites={favorites}
        toggleFavorite={toggleFavorite}
        formatTime={formatTime}
      />

      <motion.div 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="w-full h-24 glass rounded-3xl flex items-center px-8 shadow-2xl border border-white/20"
      >
        <audio 
          ref={audioRef}
          src={currentSong.url}
          onTimeUpdate={handleTimeUpdate}
          onLoadedMetadata={handleLoadedMetadata}
          onEnded={playNext}
        />

        {/* Song Info */}
        <div className="flex items-center gap-4 w-[30%] min-w-0">
          <motion.div 
            onClick={() => setIsExpanded(true)}
            animate={{ 
              rotate: isPlaying ? 360 : 0,
              boxShadow: isPlaying ? "0 0 25px rgba(99, 102, 241, 0.5)" : "0 0 0px rgba(0,0,0,0)"
            }}
            transition={{ 
              rotate: { duration: 10, repeat: Infinity, ease: "linear" },
              boxShadow: { duration: 0.5 }
            }}
            className="w-14 h-14 rounded-xl overflow-hidden shadow-lg border border-white/10 relative flex-shrink-0 cursor-pointer"
          >
            <img src={currentSong.cover} alt={currentSong.title} className="w-full h-full object-cover" />
            {isPlaying && (
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                <div className="flex items-end gap-[2px] h-3">
                  <div className="equalizer-bar" style={{ animationDelay: '0s' }}></div>
                  <div className="equalizer-bar" style={{ animationDelay: '0.2s' }}></div>
                  <div className="equalizer-bar" style={{ animationDelay: '0.4s' }}></div>
                </div>
              </div>
            )}
          </motion.div>
          <div className="overflow-hidden">
            <h4 className="font-bold text-white truncate text-sm">{currentSong.title}</h4>
            <p className="text-[11px] text-slate-400 truncate uppercase tracking-wider">{currentSong.artist}</p>
          </div>
          <button 
            onClick={() => toggleFavorite(currentSong.id)}
            className={`transition-all ml-2 hover:scale-110 flex-shrink-0 ${favorites.includes(currentSong.id) ? 'text-pink-500' : 'text-slate-500 hover:text-pink-500'}`}
          >
            <Heart size={18} fill={favorites.includes(currentSong.id) ? "currentColor" : "none"} />
          </button>
        </div>

        {/* Controls & Progress */}
        <div className="flex-1 flex flex-col items-center justify-center gap-2 px-4">
          <div className="flex items-center gap-6">
            <button className="text-slate-500 hover:text-white transition-colors">
              <Shuffle size={16} />
            </button>
            <button onClick={playPrevious} className="text-slate-300 hover:text-white transition-all hover:scale-110">
              <SkipBack size={22} fill="currentColor" />
            </button>
            <button 
              onClick={togglePlay}
              className="w-11 h-11 rounded-full bg-white text-black flex items-center justify-center hover:scale-105 transition-transform active:scale-95 shadow-[0_0_15px_rgba(255,255,255,0.3)]"
            >
              {isPlaying ? <Pause size={20} fill="black" /> : <Play size={20} fill="black" className="ml-1" />}
            </button>
            <button onClick={playNext} className="text-slate-300 hover:text-white transition-all hover:scale-110">
              <SkipForward size={22} fill="currentColor" />
            </button>
            <button className="text-slate-500 hover:text-white transition-colors">
              <Repeat size={16} />
            </button>
          </div>

          <ProgressBar 
            currentTime={currentTime} 
            duration={duration} 
            onSeek={handleSeek} 
          />
        </div>

        {/* Volume & Extra */}
        <div className="flex items-center gap-4 w-[30%] justify-end">
          <button className="text-slate-500 hover:text-white transition-colors">
            <ListMusic size={18} />
          </button>
          
          <VolumeControl 
            volume={volume}
            setVolume={setVolume}
            isMuted={isMuted}
            toggleMute={toggleMute}
          />

          <button 
            onClick={() => setIsExpanded(true)}
            className="text-slate-500 hover:text-white transition-colors"
          >
            <Maximize2 size={16} />
          </button>
        </div>
      </motion.div>
    </>
  );
};

export default Player;
