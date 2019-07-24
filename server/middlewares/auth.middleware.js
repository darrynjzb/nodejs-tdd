const JwtService = require('../services/jwt.service');

const verifyToken = async (req, res, next) => {
    try {
        const token = req.headers.authorization.replace('Bearer ', '').trim();
        req.user = await JwtService.validateToken(token);
        next();
    } catch (err) {
        res.status(401).send({
            error: err.message,
            code: 401
        });
    }  
};

module.exports = {
    verifyToken
};