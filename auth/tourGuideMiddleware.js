const authorization = (req, res, next) => {

    const token = req.decodedJwt;

    if (token.userRole === 1) {
        req.userId = token.userId
        next();
    } else {
        res
            .status(403)
            .json({message: 'This feature is for tour guides only.'})
    };
};

module.exports = authorization;