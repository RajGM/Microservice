module.exports = (err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const errorMessage = err.message || 'Internal Server Error';

    console.error(err);  // Log the full error (stack trace and all)

    // Respond to the client
    res.status(statusCode).json({
        status: 'error',
        message: errorMessage
    });
};
