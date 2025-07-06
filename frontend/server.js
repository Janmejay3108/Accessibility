const express = require('express');
const path = require('path');
const app = express();

// Serve static files from build directory
app.use(express.static(path.join(__dirname, 'build')));

// Handle React routing - serve index.html for all routes
app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

const port = process.env.PORT || 3000;
app.listen(port, '0.0.0.0', () => {
  console.log(`Server running on port ${port}`);
});
