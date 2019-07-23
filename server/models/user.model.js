const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    username: {
        type: String,
        required: [true, 'El username es requerido'],
        unique: [true, 'El username ya existe']
    },
    password: {
        type: String,
        required: [true, 'La contraseña es requerida']
    },
    email: {
        type: String,
        required: [true, 'El email es requerido'],
        unique: [true, 'El email ya existe']
    },
    fecha_nac: {
        type: Date,
        required: [true, 'La fecha de nacimiento es requerido']
    }
});

const User = mongoose.model('User', UserSchema);

module.exports = User;