const express = require('express');
const router = express.Router();
const interactionController = require('../controllers/interactionController');

// User Read Event
router.post('/read', async (req, res, next) => {
    try {
        const userId = req.body.userId;
        const contentId = req.body.contentId;

        // Validate if the user exists (You may use a function or service for this)
        const userExists = await interactionController.checkUserExists(userId);
        if (!userExists) {
            return res.status(404).json({ message: 'User not found' });
        }

        const result = await interactionController.recordReadEvent(userId, contentId);
        return res.status(201).json(result);
    } catch (error) {
        next(error);
    }
});

// User Like Event
router.post('/like', async (req, res, next) => {
    try {
        const userId = req.body.userId;
        const contentId = req.body.contentId;

        // Validate if the user exists (You may use a function or service for this)
        const userExists = await interactionController.checkUserExists(userId);
        if (!userExists) {
            return res.status(404).json({ message: 'User not found' });
        }

        const result = await interactionController.recordLikeEvent(userId, contentId);
        return res.status(201).json(result);
    } catch (error) {
        next(error);
    }
});

// Endpoint for Content Service to fetch top content based on interactions
router.get('/top-content', async (req, res, next) => {
    try {
        const topContent = await interactionController.fetchTopContent();
        return res.status(200).json(topContent);
    } catch (error) {
        next(error);
    }
});

module.exports = router;
