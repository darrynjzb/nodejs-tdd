'use strict';

const express = require('express');
const app = express();
const moment = require('moment');

const UserService = require('../services/user.service');
const JwtService = require('../services/jwt.service');

const PREFIX = '/api/v1';

app.get(`${PREFIX}/login`, async (req, res) => {
    try {
        const params = req.body;
        const user = await UserService.getByUsename(params.username);
        const passValid = await UserService.comparePassword(params.password, user.password);

        if (!passValid) {
            throw new Error('Las contraseñas no coinciden');
        }

        const token = await JwtService.generateToken(user);
        
        res.status(200).send({
            token,
            code: 200
        });
    } catch (err) {
        res.status(404).send({
            error: err.message,
            code: 404
        });
    }
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