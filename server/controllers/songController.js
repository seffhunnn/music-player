// Mock database for now since we're in prototype mode
let songs = [];

exports.uploadSong = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    const { title, artist, album } = req.body;
    const newSong = {
      id: Date.now(),
      title: title || req.file.originalname,
      artist: artist || 'Unknown Artist',
      album: album || 'Single',
      cover: 'https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?w=800',
      url: `http://localhost:5000/uploads/${req.file.filename}`,
      duration: 0 // Would normally extract this
    };

    songs.push(newSong);
    res.status(201).json(newSong);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getAllSongs = async (req, res) => {
  res.json(songs);
};

exports.getFavorites = async (req, res) => {
  const favorites = songs.filter(s => s.isLiked);
  res.json(favorites);
};

exports.toggleLike = async (req, res) => {
  const { id } = req.params;
  const song = songs.find(s => s.id == id);
  if (song) {
    song.isLiked = !song.isLiked;
    res.json(song);
  } else {
    res.status(404).json({ message: 'Song not found' });
  }
};
