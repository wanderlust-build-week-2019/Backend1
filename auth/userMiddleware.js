const authorization = (req, res, next) => {

    const token = req.decodedJwt;

    if (token.userRole === 2) {
        req.userId = token.userId
        next();
    } else {
        res
            .status(403)
            .json({message: 'This feature is for users only.'})
    };
};

module.exports = authorization;