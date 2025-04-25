const logger = (req, res, next) => {
    console.log(`Request: ${req.method} ${req.protocol}://${req.hostname}${req.originalUrl}`);
    next();
}

export default logger;