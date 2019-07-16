const jwt = require('jsonwebtoken');
const secret = require('../config/credentials.js').jwtSecret;

const restricted = (req, res, next) => {
    const token = req.headers.authorization;
  
    if (token) {
        jwt.verify(token, secret, (err, decodedToken) => {
            if (err) {
                res.status(401).json({ message: 'User was not verified' });
                console.log(err)
        }
        else {
          req.decodedJwt = decodedToken;
          next();
        }
      })
    }
    else {
      res.status(401).json({ message: 'User was not verified' });
    }
  }

module.exports = restricted;
