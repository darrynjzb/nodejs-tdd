'use strict';

const User = require('../models/user.model');

const moment = require('moment');
const bcrypt = require('bcrypt');

const register = async (params) => {
    const fechaNac = moment(params.fecha_nac, 'YYYY-MM-DD');
    const hashPass = await hashPassword(params.password).catch((err) => { reject(err); });

    const user = new User({
        username: params.username,
        password: hashPass,
        email: params.email,
        fecha_nac: fechaNac
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

const hashPassword = (strPass) => {
    const saltRounds = 10;
    return new Promise((resolve, reject) => {
        bcrypt.hash(strPass, saltRounds, (err, hash) => {
            if (err) {
                reject(err);
            }

            resolve(hash);
        });
    });
};

module.exports = {
    register
};