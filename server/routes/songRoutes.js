const express = require('express');
const router = express.Router();
const songController = require('../controllers/songController');
const upload = require('../middleware/upload');

router.post('/upload', upload.single('song'), songController.uploadSong);
router.get('/', songController.getAllSongs);
router.get('/favorites', songController.getFavorites);
router.patch('/:id/like', songController.toggleLike);

module.exports = router;
