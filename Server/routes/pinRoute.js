const express = require('express');
const { createPin, getPin, addToPin } = require('../controllers/pinController');
const Router = express.Router()

Router.post('/createPin',createPin );
Router.get('/getPin', getPin);
Router.put('/addToPin/:id', addToPin)

module.exports = Router