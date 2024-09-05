const jwt = require('jsonwebtoken');
require('dotenv').config();

function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if(token == null) return res.status(401).send({
        message: 'Token not provided.'
    });

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if(err) return res.sendStatus(403).send({
            message: 'Invalid token.'
        });
        req.user = user;
        next();
    });
}

module.exports = { authenticateToken };