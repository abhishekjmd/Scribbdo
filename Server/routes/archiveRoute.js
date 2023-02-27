const express = require('express');
const { createArchive, addToArchive, getArchive, removeToArchive } = require('../controllers/archiveController');
const Router = express.Router()

Router.post('/createArchive', createArchive);
Router.get('/getArchive', getArchive);
Router.put('/addToArchive/:id', addToArchive)
Router.put('/removeToArchive/:id/Archive/:id',removeToArchive)
module.exports = Router