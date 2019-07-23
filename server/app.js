'use strict';

const PREFIX = '/api/v1';

require('dotenv').config();
const SERVER_HOST = process.env.SERVER_HOST;
const SERVER_PORT = process.env.SERVER_PORT;

const BD_HOST = process.env.DB_HOST;
const BD_PORT = process.env.DB_PORT;
const BD_SCHEMA = process.env.DB_SCHEMA;

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

const mongoose = require('mongoose');
mongoose.connect(`mongodb://${BD_HOST}:${BD_PORT}/${BD_SCHEMA}`, {useNewUrlParser: true}, (err, res) => {
    if (err) {
        throw new Error('No se pudo conectar a la base de datos');
    }

    console.log('conectado a la base de datos');
});

app.listen(SERVER_PORT, SERVER_HOST, () => {
    console.log(`Run server http://${SERVER_HOST}:${SERVER_PORT}`);
});
