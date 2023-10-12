require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const interactionRoutes = require('./routes/interactionRoutes');
const errorHandlerMiddleware = require('./middleware/errorHandler');

const app = express();
const PORT = process.env.PORT || 3001;

// Database variables from environment
const DB_USER = process.env.DB_USER || 'root';
const DB_PASS = process.env.DB_PASS || 'example';
const DB_HOST = process.env.DB_HOST || 'mongo-db';
const DB_PORT = process.env.DB_PORT || 27017;
const DB_NAME = process.env.DB_NAME || 'interactionServiceDB';

// Constructing the MongoDB URL using the environment variables
const MONGO_URI = `mongodb://${DB_USER}:${DB_PASS}@${DB_HOST}:${DB_PORT}/${DB_NAME}?authSource=admin`;

// Database connection
mongoose.connect(MONGO_URI, { 
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
