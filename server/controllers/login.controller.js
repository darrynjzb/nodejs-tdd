'use strict';

const express = require('express');
const app = express();

const UserService = require('../services/user.service');

const PREFIX = '/api/v1';

app.post(`${PREFIX}/login`, (req, res) => {
    res.send({ data: 'login ok' });
});

app.post(`${PREFIX}/register`, async (req, res) => {
    const data = req.body;

    const user = await UserService.register(data).catch(
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

module.exports = app;