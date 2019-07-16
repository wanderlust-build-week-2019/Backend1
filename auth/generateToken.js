const jwt = require('jsonwebtoken');
const secret = require('./../config/credentials').jwtSecret;

function generateToken(user) {
    const payload = {
      userId: user.id,
      // username: user.username,
      userRole: user.role_id
    }
    const options = {
      expiresIn: '1d',
    }
    return jwt.sign(payload, secret, options)
}

module.exports = generateToken;