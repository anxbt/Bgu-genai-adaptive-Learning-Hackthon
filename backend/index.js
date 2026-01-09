/**
 * AI-Powered Adaptive Tutoring Backend
 * Production-grade Node.js backend for confusion-aware tutoring
 */

require('dotenv').config();
const express = require('express');
const cors = require('cors');

// Routes
const tutorRoutes = require('./routes/tutor.routes');
const academicRoutes = require('./routes/academic.routes');

// Initialize Express app
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Request logging middleware
app.use((req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.path}`);
    next();
});

// Health check endpoint
app.get('/health', (req, res) => {
    res.json({
        status: 'healthy',
        timestamp: new Date().toISOString(),
        service: 'AI Adaptive Tutoring Backend',
        version: '1.0.0'
    });
});

// API routes
app.use('/api', academicRoutes);
app.use('/api', tutorRoutes);

// 404 handler
app.use((req, res) => {
    res.status(404).json({
        success: false,
        error: 'Endpoint not found',
        path: req.path,
        availableEndpoints: [
            'GET /health',
            'GET /api/courses',
            'GET /api/courses/:course/years',
            'GET /api/courses/:course/years/:year/subjects',
            'GET /api/subjects/:subjectId/topics',
            'GET /api/topics/:topicId/questions',
            'POST /api/attempt',
            'POST /api/retry'
        ]
    });
});

// Global error handler
app.use((err, req, res, next) => {
    console.error('Unhandled error:', err);
    res.status(500).json({
        success: false,
        error: 'Internal server error',
        message: err.message
    });
});

// Start server
app.listen(PORT, () => {
    console.log('╔════════════════════════════════════════════════════════╗');
    console.log('║   AI-Powered Adaptive Tutoring Backend                ║');
    console.log('╚════════════════════════════════════════════════════════╝');
    console.log('');
    console.log(`🚀 Server running on http://localhost:${PORT}`);
    console.log('');
    console.log('📚 Available Endpoints:');
    console.log(`   GET  http://localhost:${PORT}/health`);
    console.log('');
    console.log('   Academic Navigation:');
    console.log(`   GET  http://localhost:${PORT}/api/courses`);
    console.log(`   GET  http://localhost:${PORT}/api/courses/:course/years`);
    console.log(`   GET  http://localhost:${PORT}/api/courses/:course/years/:year/subjects`);
    console.log(`   GET  http://localhost:${PORT}/api/subjects/:subjectId/topics`);
    console.log(`   GET  http://localhost:${PORT}/api/topics/:topicId/questions`);
    console.log('');
    console.log('   Tutoring APIs:');
    console.log(`   POST http://localhost:${PORT}/api/attempt`);
    console.log(`   POST http://localhost:${PORT}/api/retry`);
    console.log('');
    console.log('🔑 Make sure GEMINI_API_KEY is set in .env');
    console.log('');
    console.log('Press Ctrl+C to stop the server');
    console.log('════════════════════════════════════════════════════════');
});

module.exports = app;
