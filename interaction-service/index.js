const express = require('express');
const mongoose = require('mongoose');
const interactionRoutes = require('./routes/interactionRoutes');
const errorHandlerMiddleware = require('./middleware/errorHandler');

const app = express();
const PORT = process.env.PORT || 3001;

// Database connection
mongoose.connect('mongodb://mongo:27017/interactionServiceDB', { 
    useNewUrlParser: true, 
    useUnifiedTopology: true 
}).then(() => {
    console.log('Connected to MongoDB');
}).catch(err => {
    console.error('Failed to connect to MongoDB', err);
});

// Middlewares
app.use(express.json());

// Routes
app.use('/api/interactions', interactionRoutes);

// Error handling
app.use(errorHandlerMiddleware);

// Starting the server
app.listen(PORT, () => {
    console.log(`Interaction Service running on http://localhost:${PORT}`);
});

