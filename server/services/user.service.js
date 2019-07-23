'use strict';

const User = require('../models/user.model');

const register = async (params) => {
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
            }
            resolve(resBD);
        });
    });
};

module.exports = {
    register
};