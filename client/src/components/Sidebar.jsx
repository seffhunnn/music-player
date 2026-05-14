import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  Home, 
  Search, 
  Library, 
  PlusSquare, 
  Heart, 
  Music2, 
  Upload,
  User
} from 'lucide-react';
import useMusicStore from '../store/useMusicStore';

const NavItem = ({ to, icon: Icon, label }) => (
  <NavLink
    to={to}
    className={({ isActive }) => `
      flex items-center gap-4 px-4 py-3 rounded-2xl transition-all duration-300 group
      ${isActive 
        ? 'bg-white/10 text-white shadow-[0_4px_12px_rgba(255,255,255,0.05)] border border-white/10' 
        : 'text-slate-500 hover:text-white hover:bg-white/5'}
    `}
  >
    <Icon size={20} className="group-hover:scale-110 transition-transform" />
    <span className="font-bold text-sm tracking-tight">{label}</span>
  </NavLink>
);

const Sidebar = () => {
  const { playlists } = useMusicStore();

  const navItems = [
    { icon: Home, label: 'Home', path: '/' },
    { icon: Search, label: 'Search', path: '/search' },
    { icon: Library, label: 'Library', path: '/library' },
  ];

  const personalItems = [
    { icon: PlusSquare, label: 'Create Playlist', path: '/create-playlist' },
    { icon: Heart, label: 'Liked Songs', path: '/favorites' },
    { icon: Upload, label: 'Upload Song', path: '/upload' },
  ];

  return (
    <div className="w-72 h-screen flex flex-col glass border-r border-white/5 hidden lg:flex sticky top-0 overflow-hidden">
      <div className="p-8 flex flex-col h-full">
        {/* Brand */}
        <div className="flex items-center gap-3 mb-12">
          <div className="w-11 h-11 bg-gradient-to-br from-indigo-500 via-purple-600 to-pink-600 rounded-2xl flex items-center justify-center shadow-xl shadow-indigo-500/20">
            <Music2 className="text-white" size={24} />
          </div>
          <span className="text-2xl font-black tracking-tighter text-white">WaveSync</span>
        </div>

        {/* Main Nav */}
        <nav className="space-y-2">
          {navItems.map((item) => (
            <NavItem key={item.path} {...item} />
          ))}
        </nav>

        {/* Library Section */}
        <div className="mt-12">
          <p className="px-4 text-[10px] font-black text-slate-600 uppercase tracking-[0.2em] mb-6">Your Collection</p>
          <nav className="space-y-2">
            {personalItems.map((item) => (
              <NavItem key={item.path} {...item} />
            ))}
          </nav>
        </div>

        {/* Dynamic Playlists */}
        {playlists.length > 0 && (
          <div className="mt-12 flex-1 overflow-y-auto custom-scrollbar pr-2">
            <p className="px-4 text-[10px] font-black text-slate-600 uppercase tracking-[0.2em] mb-6">My Playlists</p>
            <div className="space-y-1">
              {playlists.map((playlist) => (
                <NavLink
                  key={playlist.id}
                  to={`/playlist/${playlist.id}`}
                  className={({ isActive }) => `
                    flex items-center gap-4 px-4 py-3 rounded-2xl transition-all duration-300 group
                    ${isActive ? 'text-indigo-400 bg-indigo-500/5' : 'text-slate-500 hover:text-white'}
                  `}
                >
                  <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center group-hover:bg-white/10 transition-colors">
                    <Music2 size={14} />
                  </div>
                  <span className="font-bold text-sm truncate">{playlist.name}</span>
                </NavLink>
              ))}
            </div>
          </div>
        )}

        {/* User Profile */}
        <div className="mt-auto pt-8 border-t border-white/5">
          <div className="p-4 rounded-[2rem] bg-white/5 hover:bg-white/10 transition-all cursor-pointer flex items-center gap-4 border border-white/5">
            <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center border border-white/10 shadow-lg overflow-hidden">
              <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" alt="avatar" />
            </div>
            <div className="overflow-hidden">
              <p className="text-sm font-black text-white truncate">Guest User</p>
              <p className="text-[10px] font-bold text-indigo-400/70 uppercase tracking-widest">Premium Plan</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
