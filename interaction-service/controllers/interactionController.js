const Interaction = require('../models/interaction');
const User = require('../models/user');  // Assuming you have a User model

module.exports = {

    // Method to check if a user exists in the system
    async checkUserExists(userId) {
        const user = await User.findById(userId);
        return !!user;  // returns true if the user exists, false otherwise
    },

    // Method to record a 'read' event
    async recordReadEvent(userId, contentId) {
        // You might want to include more logic here, such as preventing duplicate read events
        const readEvent = new Interaction({
            userId,
            contentId,
            eventType: 'read'
        });
        await readEvent.save();
        return { message: 'Read event recorded' };
    },

    // Method to record a 'like' event
    async recordLikeEvent(userId, contentId) {
        // Similar to the 'read' event, you might want to include logic to prevent duplicate likes or to toggle likes
        const likeEvent = new Interaction({
            userId,
            contentId,
            eventType: 'like'
        });
        await likeEvent.save();
        return { message: 'Like event recorded' };
    },

    // Method to fetch top content based on interactions (both 'read' and 'like')
    async fetchTopContent() {
        // This is a simplified way to get content sorted by the number of interactions.
        // A more complex aggregation might be necessary for production-level applications.
        const contentList = await Interaction.aggregate([
            {
                $group: {
                    _id: '$contentId',
                    count: { $sum: 1 }
                }
            },
            {
                $sort: { count: -1 }
            }
        ]);
        return contentList;
    }
};
