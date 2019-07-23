'use strict';

const express = require('express');
const app = express();
const moment = require('moment');

const UserService = require('../services/user.service');

const PREFIX = '/api/v1';

app.post(`${PREFIX}/login`, (req, res) => {
    res.send({ data: 'login ok' });
});

app.post(`${PREFIX}/register`, async (req, res) => {
    const params = req.body;
    params.fecha_nac = moment(params.fecha_nac, 'YYYY-MM-DD');

    try {
        params.password = await UserService.hashPassword(params.password);
        const user = await UserService.register(params);

        res.status(200).send({
            data: user,
            code: 200
        });
    } catch (err) {
        res.status(404).send({
            error: `Problemas al crear el usuario: ${err}`,
            code: 404
        });
    }
});

module.exports = app;