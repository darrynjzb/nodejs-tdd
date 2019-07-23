'use strict';

const express = require('express');
const app = express();
const moment = require('moment');
const bcrypt = require('bcrypt');

const UserService = require('../services/user.service');

const PREFIX = '/api/v1';

app.post(`${PREFIX}/login`, (req, res) => {
    res.send({ data: 'login ok' });
});

app.post(`${PREFIX}/register`, async (req, res) => {
    const params = req.body;
    params.fecha_nac = moment(params.fecha_nac, 'YYYY-MM-DD');
    params.password = await hashPassword(params.password).catch((err) => { reject(err); });

    const user = await UserService.register(params).catch(
        (err) => {
            res.status(401).send({
                error: `No se pudo crear el usuario: ${err}`,
                code: 401
            });
        }
    );

    res.status(200).send({
        data: user,
        code: 200
    });
});

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

module.exports = app;