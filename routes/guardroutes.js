// routes/guards.js
const express = require('express');
const Guardrouter = express.Router();
const { registerGuard, getGuards, loginGuard } = require('../controller/guardController');

Guardrouter.post('/register', registerGuard);
Guardrouter.get('/', getGuards);
Guardrouter.post('/login', loginGuard);


module.exports = Guardrouter;