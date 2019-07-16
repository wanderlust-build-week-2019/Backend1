const authorization = (req, res, next) => {

    const token = req.decodedJwt;

    if (token.userRole === 1) {
        next();
    } else {
        res
            .status(403)
            .json({message: 'Please login to continue'})
    };
};

module.exports = authorization;