const express = require('express');
const { createArchive, addToArchive, getArchive } = require('../controllers/archiveController');
const Router = express.Router()

Router.post('/createArchive', createArchive);
Router.get('/getArchive', getArchive);
Router.put('/addToArchive/:id', addToArchive)

module.exports = Router