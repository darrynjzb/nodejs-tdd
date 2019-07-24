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
                reject( new Error(err) );
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
                reject( new Error(err) );
                return;
            }
            resolve(hash);
        });
    });
};

const comparePassword = (strPassword, hash) => {
    return new Promise((resolve, reject) => {
        bcrypt.compare(strPassword, hash, (err, res) => {
            if (err) {
                reject( new Error(err) );
                return;
            }

            resolve(res);
        });
    });
};

const getByUsename = (username) => {
    return new Promise((resolve, reject) => {
        User.where({ username }).findOne((err, res) => {
            if (err) {
                reject( new Error(err) );
                return;
            }
            if (!res) {
                reject( new Error('El username especificado no existe') );
                return;
            }
            resolve(res);
        });
    });
};

module.exports = {
    register,
    hashPassword,
    getByUsename,
    comparePassword
};