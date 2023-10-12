const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        trim: true
    },
    lastName: {
        type: String,
        required: true,
        trim: true
    },
    emailId: {
        type: String,
        required: true,
        unique: true,  // Ensuring email uniqueness
        lowercase: true,
        trim: true,
        validate: [validateEmail, 'Please fill a valid email address']
    },
    phoneNumber: {
        type: String,
        trim: true,
        validate: [validatePhoneNumber, 'Please fill a valid phone number']
    }
});

function validateEmail(email) {
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
    return emailRegex.test(email);
}

function validatePhoneNumber(number) {
    const phoneRegex = /^[0-9]{10}$/;  // Adjust this regex according to your needs (e.g. international numbers)
    return phoneRegex.test(number);
}

const User = mongoose.model('User', userSchema);

module.exports = User;
