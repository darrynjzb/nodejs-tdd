const express = require('express');
const app = express();

const PREFIX = '/api/v1';

app.post(`${PREFIX}/login`, (req, res) => {
    res.send({ data: 'login ok' });
});

app.post(`${PREFIX}/register`, (req, res) => {
    res.send({ data: 'register ok' });
});

module.exports = app;