'use strict';

const User = require('../models/user.model');
const bcrypt = require('bcrypt');

const register = (params) => {
    const user = new User({
        username: params.username,
        password: params.password,
        email: params.email,
        fecha_nac: params.fecha_nac
    });
    return new Promise((resolve, reject) => {
        user.save((err, resBD) => {
            if (err) {
                reject(err);
                return;
            }
            resolve(resBD);
        });
    });
};

const hashPassword = (strPass) => {
    const saltRounds = 10;
    return new Promise((resolve, reject) => {
        bcrypt.hash(strPass, saltRounds, (err, hash) => {
            if (err) {
                reject(err);
                return;
            }
            resolve(hash);
        });
    });
};

module.exports = {
    register,
    hashPassword
};