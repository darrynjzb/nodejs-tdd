'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

/** dotenv variables */
require('dotenv').config();
const SERVER_HOST = process.env.SERVER_HOST;
const SERVER_PORT = process.env.SERVER_PORT;

const BD_HOST = process.env.DB_HOST;
const BD_PORT = process.env.DB_PORT;
const BD_SCHEMA = process.env.DB_SCHEMA;

/** controllers */
const loginController = require('./controllers/login.controller');

const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(loginController);

const mongoose = require('mongoose');
const database = `mongodb://${BD_HOST}:${BD_PORT}/${BD_SCHEMA}`;
mongoose.connect(database, {useNewUrlParser: true}, (err, res) => {
    if (err) {
        throw new Error('No se pudo conectar a la base de datos');
    }

    console.log(`Database run: ${database}`);
});

app.listen(SERVER_PORT, SERVER_HOST, () => {
    console.log(`Run server: http://${SERVER_HOST}:${SERVER_PORT}`);
});
