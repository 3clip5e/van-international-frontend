const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

// Import routes
const userRouter = require('./routers/user.router');
const heroRouter = require('./routers/hero.router');
const aboutRouter = require('./routers/about.router');
const metricsRouter = require('./routers/metrics.router');
const valuesRouter = require('./routers/values.router');
const contactRouter = require('./routers/contact.router');

// Initialize express app
const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files from React build
app.use(express.static(path.join(__dirname, '../dist')));

// API routes
app.use('/api/auth', userRouter);
app.use('/api/hero', heroRouter);
app.use('/api/about', aboutRouter);
app.use('/api/metrics', metricsRouter);
app.use('/api/values', valuesRouter);
app.use('/api/contact', contactRouter);

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// Catch-all handler: send back React's index.html file
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../dist/index.html'));
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

const PORT = process.env.PORT || 3001;

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = app;
