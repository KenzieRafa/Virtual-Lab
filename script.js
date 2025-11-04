const express = require('express');
const path = require('path');
const app = express();

// Serve static files from the "public" folder
app.use(express.static(path.join(__dirname, 'src')));

// Route for root (index)
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'src', 'index.html'));
});

app.get('/canvas/', (req, res) => {
  res.sendFile(path.join(__dirname, 'src', 'view', 'canvas.html'));
});

app.get('/dragdrop/', (req, res) => {
  res.sendFile(path.join(__dirname, 'src', 'view', 'dragdrop.html'));
});

app.get('/leaderboard/', (req, res) => {
  res.sendFile(path.join(__dirname, 'src', 'view', 'leaderboard.html'));
});

app.get('/material/', (req, res) => {
  res.sendFile(path.join(__dirname, 'src', 'view', 'material.html'));
});

app.get('/practice/', (req, res) => {
  res.sendFile(path.join(__dirname, 'src', 'view', 'practice.html'));
});

app.get('/profile/', (req, res) => {
  res.sendFile(path.join(__dirname, 'src', 'view', 'profile.html'));
});

app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});
