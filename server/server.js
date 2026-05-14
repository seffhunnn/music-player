const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Routes
app.get('/', (req, res) => {
  res.send('WaveSync API is running...');
});

// Import and use routes
const songRoutes = require('./routes/songRoutes');
app.use('/api/songs', songRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
