import React, { useMemo, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Play, Clock, TrendingUp } from 'lucide-react';
import { mockSongs, mockPlaylists } from '../data/mockSongs';
import useMusicStore from '../store/useMusicStore';
import SongCard from '../components/SongCard';

const Home = () => {
  const { 
    setCurrentSong, 
    setQueue, 
    searchQuery, 
    uploadedSongs, 
    recentlyPlayed,
    favorites,
    toggleFavorite
  } = useMusicStore();

  const allSongs = useMemo(() => [...mockSongs, ...uploadedSongs], [uploadedSongs]);
  
  const filteredSongs = useMemo(() => {
    const query = searchQuery.toLowerCase().trim();
    if (!query) return allSongs;
    return allSongs.filter(song => 
      song.title.toLowerCase().includes(query) ||
      song.artist.toLowerCase().includes(query) ||
      song.album.toLowerCase().includes(query)
    );
  }, [allSongs, searchQuery]);

  const handlePlaySong = useCallback((song) => {
    setCurrentSong(song);
    setQueue(filteredSongs.length > 0 ? filteredSongs : allSongs);
  }, [setCurrentSong, setQueue, filteredSongs, allSongs]);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-12 pb-20"
    >
      {/* Hero Section */}
      {!searchQuery && (
        <section className="relative h-96 rounded-[3rem] overflow-hidden group shadow-2xl">
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/40 to-transparent z-10"></div>
          <img 
            src="https://images.unsplash.com/photo-1493225255756-d9584f8606e9?w=1600&auto=format&fit=crop&q=80" 
            alt="The Weeknd" 
            className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000"
            loading="eager"
          />
          <div className="absolute inset-0 z-20 p-12 flex flex-col justify-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <span className="bg-indigo-500/20 text-indigo-400 px-4 py-1.5 rounded-full text-xs font-bold border border-indigo-500/30 backdrop-blur-md mb-6 inline-block uppercase tracking-widest">Featured Artist</span>
              <h1 className="text-6xl md:text-8xl font-black mb-4 tracking-tighter text-white">The Weeknd</h1>
              <p className="text-slate-300 max-w-lg mb-10 text-lg leading-relaxed">Experience the cinematic R&B world of Abel Tesfaye. Listen to the latest hits from Starboy and After Hours.</p>
              <div className="flex gap-6">
                <button 
                  onClick={() => handlePlaySong(mockSongs[1])}
                  className="bg-white text-black px-10 py-4 rounded-2xl font-black flex items-center gap-3 hover:bg-slate-200 transition-all hover:scale-105 active:scale-95 shadow-xl"
                >
                  <Play size={24} fill="black" /> Play Now
                </button>
                <button className="bg-white/10 backdrop-blur-md border border-white/20 text-white px-10 py-4 rounded-2xl font-black hover:bg-white/20 transition-all shadow-xl">
                  Explore Album
                </button>
              </div>
            </motion.div>
          </div>
        </section>
      )}

      {/* Recommended / Search Results */}
      <section>
        <div className="flex justify-between items-end mb-6">
          <div>
            <h2 className="text-2xl font-bold mb-1 text-white">
              {searchQuery ? `Search Results for "${searchQuery}"` : "Recommended for You"}
            </h2>
            <p className="text-slate-400 text-sm">
              {searchQuery ? `Found ${filteredSongs.length} matches` : "Based on your recent listening"}
            </p>
          </div>
          {!searchQuery && <button className="text-indigo-400 text-sm font-semibold hover:underline">See all</button>}
        </div>

        {filteredSongs.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {filteredSongs.map((song) => (
              <SongCard 
                key={song.id}
                song={song}
                onPlay={handlePlaySong}
                isFavorite={favorites.includes(song.id)}
                onToggleFavorite={toggleFavorite}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 glass rounded-[2.5rem] border border-white/5">
            <p className="text-slate-500">No songs found matching your search.</p>
          </div>
        )}
      </section>

      {/* Recently Played */}
      {recentlyPlayed.length > 0 && !searchQuery && (
        <section>
          <div className="flex items-center gap-2 mb-6">
            <Clock className="text-indigo-400" size={24} />
            <h2 className="text-2xl font-bold text-white">Recently Played</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
            {recentlyPlayed.map((song) => (
              <motion.div 
                key={`recent-${song.id}`}
                whileHover={{ y: -5 }}
                className="flex items-center gap-4 p-3 rounded-2xl bg-white/5 hover:bg-white/10 transition-all cursor-pointer group"
                onClick={() => handlePlaySong(song)}
              >
                <img src={song.cover} className="w-12 h-12 rounded-lg object-cover" alt="" />
                <div className="overflow-hidden">
                  <p className="text-sm font-bold truncate text-white">{song.title}</p>
                  <p className="text-xs text-slate-400 truncate uppercase">{song.artist}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </section>
      )}

      {/* Featured Playlists */}
      <section className="pb-10">
        <div className="flex items-center gap-2 mb-6">
          <TrendingUp className="text-purple-400" />
          <h2 className="text-2xl font-bold text-white">Trending Playlists</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {mockPlaylists.map((playlist) => (
            <motion.div 
              whileHover={{ scale: 1.02 }}
              key={playlist.id}
              className="glass p-6 rounded-[2rem] flex items-center gap-6 group cursor-pointer border border-white/5 shadow-lg"
            >
              <div className="w-32 h-32 rounded-2xl overflow-hidden flex-shrink-0 shadow-2xl relative">
                <img src={playlist.cover} alt={playlist.name} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-indigo-500/20 mix-blend-overlay"></div>
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-bold mb-2 group-hover:text-indigo-400 transition-colors text-white">{playlist.name}</h3>
                <p className="text-slate-400 text-sm mb-4 line-clamp-2">{playlist.description}</p>
                <div className="flex items-center gap-4 text-xs text-slate-500 font-bold uppercase tracking-wider">
                  <span>{playlist.songCount} songs</span>
                  <span>1.2k likes</span>
                </div>
              </div>
              <button className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center hover:bg-indigo-500 hover:text-white transition-all group-hover:translate-x-2">
                <Play size={20} fill="currentColor" />
              </button>
            </motion.div>
          ))}
        </div>
      </section>
    </motion.div>
  );
};

export default Home;
