# WaveSync Music Player

A modern full-stack inspired music player prototype built using React, featuring local song playback, uploads, playlists, favorites, and premium UI.

---

## How to Run the Frontend

1. **Clone the repository**
   ```bash
   git clone <your-repo-link>
   cd music-player/client
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Start the App**
   ```bash
   npm run dev
   ```

4. **Access the App**
   Open `http://localhost:5173/` in your browser.

---

## How to Add Songs Locally

To add your own songs to the library manually:

1. Place your `.mp3` files in the `client/src/assets/songs/` directory.
2. Open `client/src/data/mockSongs.js`.
3. Import your song at the top:
   ```javascript
   import MySong from '../assets/songs/my-song.mp3';
   ```
4. Add a new object to the `mockSongs` array:
   ```javascript
   {
     id: 'unique-id',
     title: "Song Title",
     artist: "Artist Name",
     album: "Album Name",
     cover: "URL_TO_COVER_IMAGE",
     url: MySong,
     category: "Pop"
   }
   ```

---

Created for College Prototype Demo.
