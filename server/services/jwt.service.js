const jwt = require('jsonwebtoken');
const moment = require('moment');

const SECRET_JWT = process.env.SECRET_JWT;

const generateToken = (user) => {
    return new Promise((resolve, reject) => {
        const payload = {
            user,
            iat: moment().unix(),
            exp: moment().add(30, 'd').unix()
        };

        jwt.sign(payload, SECRET_JWT, (err, token) => {
            if (err) {
                reject( new Error(err) );
                return;
            }

            resolve(token);
        });
    });
};

const validateToken = (token) => {
    return new Promise((resolve, reject) => {
        jwt.verify(token, SECRET_JWT, (err, decoded) => {
            if (err) {
                reject( new Error(`Token inválido: ${err}`) );
                return;
            }

            resolve(decoded);
        });
    });
};

module.exports = {
    generateToken,
    validateToken
};