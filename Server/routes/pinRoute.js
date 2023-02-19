const express = require('express');
const { createPin, getPin, addToPin, removeFromPin } = require('../controllers/pinController');
const Router = express.Router()

Router.put('/removeFromPin/:id/Pin/:id', removeFromPin)
Router.post('/createPin',createPin );
Router.get('/getPin', getPin);
Router.put('/addToPin/:id', addToPin)

module.exports = Router