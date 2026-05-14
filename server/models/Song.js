const mongoose = require('mongoose');

const songSchema = new mongoose.Schema({
  title: { type: String, required: true },
  artist: { type: String, default: 'Unknown Artist' },
  album: { type: String, default: 'Single' },
  cover: { type: String, default: 'https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?w=800' },
  url: { type: String, required: true },
  duration: { type: Number },
  userId: { type: String }, // For guest/user isolation
  isLiked: { type: Boolean, default: false },
}, { timestamps: true });

module.exports = mongoose.model('Song', songSchema);
