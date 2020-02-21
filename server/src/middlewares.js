const notFound = (req, res, next) => {
    const error = new Error(`Not Found - ${req.originalUrl}`);
    //creates the error
    res.status(404);
    //sets the status code
    next(error);
    //forwarding things onto error handler
};

const errorHandler = (error, req, res, next) => {
    const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
    res.status(statusCode)
    res.json({
        message: error.message,
        stack: process.env.NODE_ENV === 'production' ? 'stack' : error.stack,
        //only use stack in production
    })
};

module.exports = {
    notFound,
    errorHandler
}