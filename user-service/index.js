const express = require('express');
const mongoose = require('mongoose');
const userRoutes = require('./routes/userRoutes');
const errorHandlerMiddleware = require('./middleware/errorHandler');

const app = express();
const PORT = process.env.PORT || 3002;

// Database connection
mongoose.connect('mongodb://mongo:27017/userServiceDB', { 
    useNewUrlParser: true, 
    useUnifiedTopology: true 
}).then(() => {
    console.log('Connected to User Service DB');
}).catch(err => {
    console.error('Failed to connect to MongoDB', err);
});

// Middlewares
app.use(express.json());

// Routes
app.use('/api/users', userRoutes);

// Error handling
app.use(errorHandlerMiddleware);

// Starting the server
app.listen(PORT, () => {
    console.log(`User Service running on http://localhost:${PORT}`);
});
