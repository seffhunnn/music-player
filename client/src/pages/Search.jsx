import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { Search as SearchIcon } from 'lucide-react';
import { mockSongs } from '../data/mockSongs';
import useMusicStore from '../store/useMusicStore';
import SongCard from '../components/SongCard';

const Search = () => {
  const { 
    searchQuery, 
    setSearchQuery, 
    uploadedSongs, 
    setCurrentSong, 
    setQueue,
    favorites,
    toggleFavorite
  } = useMusicStore();

  const allSongs = useMemo(() => [...mockSongs, ...uploadedSongs], [uploadedSongs]);
  
  const filteredSongs = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    if (!query) return [];
    return allSongs.filter(song => 
      song.title.toLowerCase().includes(query) ||
      song.artist.toLowerCase().includes(query) ||
      song.album.toLowerCase().includes(query)
    );
  }, [allSongs, searchQuery]);

  const handlePlaySong = (song) => {
    setCurrentSong(song);
    setQueue(filteredSongs);
  };

  const categories = [
    { name: 'Pop', color: 'from-pink-500 to-rose-500' },
    { name: 'Rock', color: 'from-orange-500 to-red-500' },
    { name: 'Hip Hop', color: 'from-indigo-500 to-blue-500' },
    { name: 'Electronic', color: 'from-emerald-500 to-teal-500' },
    { name: 'Jazz', color: 'from-amber-500 to-orange-600' },
    { name: 'Classical', color: 'from-slate-600 to-slate-800' },
    { name: 'Chill', color: 'from-cyan-500 to-blue-500' },
    { name: 'Gaming', color: 'from-purple-500 to-indigo-600' }
  ];

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-12 pb-20"
    >
      {/* Mobile Search Bar (Visible only on small screens) */}
      <div className="md:hidden mb-6">
        <div className="relative group">
          <input 
            type="text" 
            placeholder="Search for songs, artists..." 
            className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 pl-14 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all text-white"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <SearchIcon className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-500" size={24} />
        </div>
      </div>

      {searchQuery.trim() ? (
        <section>
          <div className="flex items-center gap-4 mb-8">
            <div className="p-3 rounded-2xl bg-indigo-500/10 text-indigo-400">
              <SearchIcon size={24} />
            </div>
            <h2 className="text-3xl font-black text-white">Results for "{searchQuery}"</h2>
          </div>

          {filteredSongs.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
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
            <div className="text-center py-24 glass rounded-[3rem] border border-white/5">
              <SearchIcon size={64} className="text-slate-800 mx-auto mb-6" />
              <p className="text-xl font-bold text-slate-500 mb-2">No matches found</p>
              <p className="text-slate-600">Try searching with different keywords or artists.</p>
            </div>
          )}
        </section>
      ) : (
        <section>
          <h2 className="text-3xl font-black text-white mb-10 tracking-tight">Browse Categories</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {categories.map((cat) => (
              <motion.div
                whileHover={{ scale: 1.05, rotate: 1, y: -5 }}
                whileTap={{ scale: 0.95 }}
                key={cat.name}
                className={`h-48 rounded-[2.5rem] p-8 relative overflow-hidden cursor-pointer shadow-2xl border border-white/5 bg-gradient-to-br ${cat.color}`}
              >
                <h3 className="text-3xl font-black text-white relative z-10">{cat.name}</h3>
                <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-white/20 blur-3xl rounded-full"></div>
                <div className="absolute top-4 right-4 text-white/20">
                  <SearchIcon size={80} strokeWidth={4} />
                </div>
              </motion.div>
            ))}
          </div>
        </section>
      )}
    </motion.div>
  );
};

export default Search;
