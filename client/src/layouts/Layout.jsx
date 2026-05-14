import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import Player from '../components/Player';
import { Search as SearchIcon, Bell, User } from 'lucide-react';
import useMusicStore from '../store/useMusicStore';

const Layout = () => {
  const location = useLocation();
  const { searchQuery, setSearchQuery } = useMusicStore();
  
  // Dynamic header title based on route
  const getPageTitle = () => {
    const path = location.pathname;
    if (path === '/') return 'Good afternoon';
    if (path === '/search') return 'Search';
    if (path === '/library') return 'Library';
    if (path === '/upload') return 'Publish';
    if (path === '/favorites') return 'Favorites';
    if (path === '/create-playlist') return 'Playlist';
    return 'WaveSync';
  };

  return (
    <div className="flex bg-[#020617] text-white min-h-screen selection:bg-indigo-500/30">
      {/* Sidebar - Desktop Only */}
      <Sidebar />

      {/* Main Content Area */}
      <main className="flex-1 h-screen overflow-y-auto pb-32 pt-6 px-6 md:px-12 custom-scrollbar relative z-10">
        
        {/* Top Header */}
        <header className="flex items-center justify-between mb-10 sticky top-0 bg-[#020617]/80 backdrop-blur-xl z-50 py-4 -mx-2 px-2">
          <div className="flex items-center gap-8 flex-1">
            <h2 className="text-xl font-black hidden md:block tracking-tight">{getPageTitle()}</h2>
            
            {/* Search Input - Desktop */}
            <div className="relative max-w-md w-full hidden md:block group">
              <input 
                type="text" 
                placeholder="Search for songs, artists..." 
                className="w-full bg-white/5 border border-white/10 rounded-2xl py-3 px-6 pl-12 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all text-sm font-medium"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-indigo-400 transition-colors" size={18} />
            </div>
          </div>

          <div className="flex items-center gap-4">
            <button className="p-3 rounded-2xl bg-white/5 border border-white/10 text-slate-400 hover:text-white hover:bg-white/10 transition-all relative">
              <Bell size={20} />
              <span className="absolute top-3 right-3 w-2 h-2 bg-indigo-500 rounded-full border-2 border-[#020617]"></span>
            </button>
            <button className="flex items-center gap-3 p-1.5 pr-4 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all group">
              <div className="w-9 h-9 rounded-xl bg-slate-800 flex items-center justify-center border border-white/10 overflow-hidden">
                <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" alt="User" />
              </div>
              <span className="text-sm font-black text-slate-300 group-hover:text-white transition-colors">Felix</span>
            </button>
          </div>
        </header>

        {/* Page Content */}
        <Outlet />
        
        {/* Floating Player - Centered relative to dashboard */}
        <div className="fixed bottom-8 left-0 lg:left-72 right-0 flex justify-center z-50 pointer-events-none px-6">
          <div className="pointer-events-auto w-full max-w-5xl">
            <Player />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Layout;
