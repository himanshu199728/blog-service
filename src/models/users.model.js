const { Schema, model, Types } = require('mongoose');
const { JSON } = require('../constant/header.constant');
const emailMatch = /^(([^<>()\[\]\\.,;:\s@']+(\.[^<>()\[\]\\.,;:\s@']+)*)|('.+'))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const UserSchema = new Schema({
    id: { type: String, unique: true, index: true },
    email: { type: String, default: 'user', match: emailMatch },
    password: { type: String, default: 'P1$1P' },
    name: { type: String, default: 'user' },
    age: { type: Number, default: null, max: 150, validate: { validator: Number.isInteger } },
    badge: { type: Object, default: { bronze: false, silver: false, gold: false, diamond: false, supreme: false } },
    is_deleted: { type: Boolean, default: false }
});

const Users = model('Users', UserSchema);
module.exports = Users;