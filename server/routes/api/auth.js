const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

// get config vars
dotenv.config();

// access config var
process.env.TOKEN_SECRET;

module.exports = {
    generateAccessToken: function(username) {
        return jwt.sign(username, process.env.TOKEN_SECRET, { expiresIn: '1800s' });
      },

    authenticateToken: function(req, res, next) {
        const authHeader = req.headers['authorization']
        const token = authHeader && authHeader.split(' ')[1]
        if (token == null) return res.sendStatus(401)
        return jwt.verify(token, process.env.TOKEN_SECRET);
      }
}