import React, { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Upload as UploadIcon, X, Music, CheckCircle2, Loader2, AlertCircle } from 'lucide-react';
import useMusicStore from '../store/useMusicStore';

const Upload = () => {
  const { addUploadedSong } = useMusicStore();
  
  const [file, setFile] = useState(null);
  const [dragActive, setDragActive] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    artist: '',
    album: '',
  });

  const handleDrag = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(e.type === "dragenter" || e.type === "dragover");
  }, []);

  const handleFile = (uploadedFile) => {
    if (uploadedFile?.type.startsWith('audio/')) {
      setFile(uploadedFile);
      setError(null);
    } else {
      setError("Please upload a valid audio file (MP3, WAV, etc.)");
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files?.[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file) return;

    setUploading(true);
    setError(null);
    
    try {
      // Simulate processing latency for demo effect
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const songUrl = URL.createObjectURL(file);
      const newSong = {
        id: `uploaded-${Date.now()}`,
        title: formData.title.trim() || file.name.split('.')[0],
        artist: formData.artist.trim() || 'Unknown Artist',
        album: formData.album.trim() || 'Single',
        cover: 'https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?w=800',
        url: songUrl,
        duration: 0, 
        color: '#6366f1'
      };

      addUploadedSong(newSong);
      
      setSuccess(true);
      setUploading(false);
      setFile(null);
      setFormData({ title: '', artist: '', album: '' });
      setTimeout(() => setSuccess(false), 3000);
    } catch (err) {
      console.error("Upload failed:", err);
      setError("Something went wrong during upload. Please try again.");
      setUploading(false);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      className="max-w-4xl mx-auto pb-20"
    >
      <div className="mb-10">
        <h1 className="text-4xl font-black text-white mb-2 tracking-tight">Upload Your Music</h1>
        <p className="text-slate-400 font-medium">Share your sounds with the world. Support MP3, WAV, and FLAC.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        {/* Upload Area */}
        <div 
          className={`
            relative h-[400px] rounded-[3rem] border-2 border-dashed transition-all duration-500 flex flex-col items-center justify-center p-8
            ${dragActive ? 'border-indigo-500 bg-indigo-500/5 scale-[1.02]' : 'border-white/10 bg-white/5'}
            ${file ? 'border-purple-500 bg-purple-500/5' : ''}
          `}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        >
          {file ? (
            <div className="text-center">
              <div className="w-24 h-24 bg-purple-500/20 rounded-[2rem] flex items-center justify-center mx-auto mb-6 shadow-2xl">
                <Music className="text-purple-400" size={48} />
              </div>
              <h3 className="text-xl font-bold text-white mb-2 truncate max-w-[250px]">{file.name}</h3>
              <p className="text-sm font-bold text-slate-500 mb-8 uppercase">{(file.size / (1024 * 1024)).toFixed(2)} MB</p>
              <button 
                onClick={() => setFile(null)}
                className="flex items-center gap-2 text-red-400 hover:text-red-300 text-sm font-black transition-colors uppercase tracking-widest"
              >
                <X size={16} /> Remove file
              </button>
            </div>
          ) : (
            <div className="text-center group">
              <div className="w-24 h-24 bg-white/5 rounded-[2rem] flex items-center justify-center mx-auto mb-6 group-hover:bg-indigo-500/10 transition-colors">
                <UploadIcon className="text-slate-500 group-hover:text-indigo-400 transition-colors" size={48} />
              </div>
              <h3 className="text-2xl font-black text-white mb-2">Drag & Drop Song</h3>
              <p className="text-sm text-slate-500 font-medium mb-10">or click to browse from your computer</p>
              <input 
                type="file" 
                id="file-upload" 
                className="hidden" 
                accept="audio/*"
                onChange={(e) => handleFile(e.target.files[0])}
              />
              <label 
                htmlFor="file-upload"
                className="bg-white text-black px-10 py-4 rounded-2xl font-black cursor-pointer hover:bg-indigo-100 hover:scale-105 active:scale-95 transition-all shadow-xl"
              >
                Select File
              </label>
            </div>
          )}
        </div>

        {/* Metadata Form */}
        <div className="glass p-10 rounded-[3rem] border border-white/5 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/10 blur-[80px] -mr-16 -mt-16"></div>
          
          <h2 className="text-2xl font-black text-white mb-8 flex items-center gap-3">
             Song Details
          </h2>
          
          <form onSubmit={handleUpload} className="space-y-6 relative z-10">
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-black text-slate-500 uppercase tracking-widest mb-2 ml-1">Song Title</label>
                <input 
                  type="text" 
                  placeholder="Enter song name"
                  className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all text-white placeholder:text-slate-600"
                  value={formData.title}
                  onChange={(e) => setFormData({...formData, title: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-xs font-black text-slate-500 uppercase tracking-widest mb-2 ml-1">Artist Name</label>
                <input 
                  type="text" 
                  placeholder="Enter artist name"
                  className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all text-white placeholder:text-slate-600"
                  value={formData.artist}
                  onChange={(e) => setFormData({...formData, artist: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-xs font-black text-slate-500 uppercase tracking-widest mb-2 ml-1">Album Name</label>
                <input 
                  type="text" 
                  placeholder="Enter album name"
                  className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all text-white placeholder:text-slate-600"
                  value={formData.album}
                  onChange={(e) => setFormData({...formData, album: e.target.value})}
                />
              </div>
            </div>

            <AnimatePresence>
              {error && (
                <motion.div 
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="flex items-center gap-2 text-red-400 text-sm font-bold"
                >
                  <AlertCircle size={16} /> {error}
                </motion.div>
              )}
            </AnimatePresence>

            <button 
              type="submit"
              disabled={!file || uploading}
              className={`
                w-full py-5 rounded-2xl font-black text-lg flex items-center justify-center gap-3 transition-all
                ${!file || uploading 
                  ? 'bg-slate-800 text-slate-500 cursor-not-allowed' 
                  : 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-xl shadow-indigo-500/20 hover:scale-[1.02] active:scale-95'}
              `}
            >
              {uploading ? (
                <>
                  <Loader2 className="animate-spin" size={24} /> Processing...
                </>
              ) : success ? (
                <>
                  <CheckCircle2 size={24} className="text-white" /> Done!
                </>
              ) : (
                'Publish Song'
              )}
            </button>
          </form>
        </div>
      </div>
    </motion.div>
  );
};

export default Upload;
