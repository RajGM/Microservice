const mongoose = require('mongoose');

const interactionSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'  // Assuming the User model is named 'User'
    },
    contentId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Content'  // Assuming the Content model is named 'Content'
    },
    eventType: {
        type: String,
        required: true,
        enum: ['read', 'like'],  // Only two types of interactions are allowed
    },
    timestamp: {
        type: Date,
        default: Date.now,
    }
});

// Compound index to ensure that a user cannot have the same type of interaction 
// with the same content more than once (e.g., a user cannot 'like' the same content twice)
interactionSchema.index({ userId: 1, contentId: 1, eventType: 1 }, { unique: true });

const Interaction = mongoose.model('Interaction', interactionSchema);

module.exports = Interaction;
