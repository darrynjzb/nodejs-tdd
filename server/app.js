'use strict';

const PREFIX = '/api/v1';

require('dotenv').config();
const SERVER_HOST = process.env.SERVER_HOST;
const SERVER_PORT = process.env.SERVER_PORT;

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get(`${PREFIX}/`, (req, res) => {
    res.send({ data: 'ok' });
});

app.listen(SERVER_PORT, SERVER_HOST, () => {
    console.log(`Run server http://${SERVER_HOST}:${SERVER_PORT}`);
});
