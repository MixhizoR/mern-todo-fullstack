const notFound = (req, res, next) => {
    return next({ message: `Not found: ${req.originalUrl}`, status: 404 });
}

export default notFound