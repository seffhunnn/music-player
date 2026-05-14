import { create } from 'zustand';
import { getStorageItem, setStorageItem } from '../utils/storage';

const useMusicStore = create((set) => ({
  // Playback State
  currentSong: null,
  isPlaying: false,
  volume: getStorageItem('ws_volume', 0.7),
  currentTime: 0,
  duration: 0,
  queue: [],
  
  // Library State
  favorites: getStorageItem('ws_favorites', []),
  playlists: getStorageItem('ws_playlists', []),
  recentlyPlayed: getStorageItem('ws_recent', []),
  uploadedSongs: [],
  searchQuery: '',

  // Actions
  setIsPlaying: (playing) => set({ isPlaying: playing }),
  
  setCurrentSong: (song) => set((state) => {
    if (!song) return { currentSong: null, isPlaying: false };
    
    // Add to recently played without duplicates
    const updatedRecent = [
      song, 
      ...state.recentlyPlayed.filter(s => s.id !== song.id)
    ].slice(0, 10);
    
    setStorageItem('ws_recent', updatedRecent);
    
    return { 
      currentSong: song, 
      isPlaying: true, 
      recentlyPlayed: updatedRecent 
    };
  }),

  setVolume: (val) => {
    setStorageItem('ws_volume', val);
    set({ volume: val });
  },

  setCurrentTime: (time) => set({ currentTime: time }),
  setDuration: (dur) => set({ duration: dur }),
  setQueue: (songs) => set({ queue: songs }),
  setSearchQuery: (query) => set({ searchQuery: query }),

  toggleFavorite: (songId) => set((state) => {
    const isFavorite = state.favorites.includes(songId);
    const updatedFavorites = isFavorite
      ? state.favorites.filter(id => id !== songId)
      : [...state.favorites, songId];
    
    setStorageItem('ws_favorites', updatedFavorites);
    return { favorites: updatedFavorites };
  }),

  addUploadedSong: (song) => set((state) => ({
    uploadedSongs: [song, ...state.uploadedSongs]
  })),

  createPlaylist: (name) => set((state) => {
    const newPlaylist = {
      id: `pl-${Date.now()}`,
      name,
      songs: [],
      cover: 'https://images.unsplash.com/photo-1493225255756-d9584f8606e9?w=800',
      createdAt: new Date().toISOString()
    };
    const updatedPlaylists = [...state.playlists, newPlaylist];
    setStorageItem('ws_playlists', updatedPlaylists);
    return { playlists: updatedPlaylists };
  }),

  // Navigation / Control Helpers
  playNext: () => set((state) => {
    if (state.queue.length === 0) return state;
    const currentIndex = state.queue.findIndex(s => s.id === state.currentSong?.id);
    const nextIndex = (currentIndex + 1) % state.queue.length;
    return { currentSong: state.queue[nextIndex], isPlaying: true };
  }),

  playPrevious: () => set((state) => {
    if (state.queue.length === 0) return state;
    const currentIndex = state.queue.findIndex(s => s.id === state.currentSong?.id);
    const prevIndex = (currentIndex - 1 + state.queue.length) % state.queue.length;
    return { currentSong: state.queue[prevIndex], isPlaying: true };
  })
}));

export default useMusicStore;
