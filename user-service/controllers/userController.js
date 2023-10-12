const User = require('../models/user');

// Fetch all users
exports.getAllUsers = async (req, res, next) => {
    try {
        const users = await User.find();
        return res.status(200).json(users);
    } catch (error) {
        next(error);
    }
};

// Fetch a single user by ID
exports.getUserById = async (req, res, next) => {
    try {
        const userId = req.params.id;
        const user = await User.findById(userId);
        
        if (!user) return res.status(404).json({ message: 'User not found' });
        
        return res.status(200).json(user);
    } catch (error) {
        next(error);
    }
};

// Create a new user
exports.createUser = async (req, res, next) => {
    try {
        const { firstName, lastName, emailId, phoneNumber } = req.body;
        
        // Create a new user instance and save it
        const newUser = new User({ firstName, lastName, emailId, phoneNumber });
        const result = await newUser.save();

        return res.status(201).json(result);
    } catch (error) {
        next(error);
    }
};

// Update user details
exports.updateUser = async (req, res, next) => {
    try {
        const userId = req.params.id;
        const { firstName, lastName, emailId, phoneNumber } = req.body;

        // Find user by ID and update its details
        const updatedUser = await User.findByIdAndUpdate(userId, { firstName, lastName, emailId, phoneNumber }, { new: true });
        
        if (!updatedUser) return res.status(404).json({ message: 'User not found' });

        return res.status(200).json(updatedUser);
    } catch (error) {
        next(error);
    }
};

// Delete a user
exports.deleteUser = async (req, res, next) => {
    try {
        const userId = req.params.id;

        // Find user by ID and delete it
        const result = await User.findByIdAndRemove(userId);
        
        if (!result) return res.status(404).json({ message: 'User not found' });

        return res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
        next(error);
    }
};
