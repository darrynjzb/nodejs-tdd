const express = require('express');
const app = express();

const User = require('../models/user.model');

const moment = require('moment');
const bcrypt = require('bcrypt');

const PREFIX = '/api/v1';

app.post(`${PREFIX}/login`, (req, res) => {
    res.send({ data: 'login ok' });
});

app.post(`${PREFIX}/register`, async (req, res) => {
    const data = req.body;

    const fechaNac = moment(data.fecha_nac, 'YYYY-MM-DD');
    const hashPass = await hashPassword(data.password)
        .catch(
            (err) => {
                res.status(401).send({
                    error: `No se pudo generar la password: ${err}`,
                    code: 401
                });
            }
        );

    const user = new User({
        username: data.username,
        password: hashPass,
        email: data.email,
        fecha_nac: fechaNac
    });

    user.save((err, resBD) => {
        if (err) {
            res.status(401).send({
                error: `No se pude registrar el usuario: ${err}`,
                code: 401
            });
        }

        res.status(200).send({
            data: resBD,
            code: 200
        });
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