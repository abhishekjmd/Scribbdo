const express = require('express');
const { createNote, getNotes, deleteNotes } = require('../controllers/notesController');
const Router = express.Router();

Router.post('/addNotes', createNote);
Router.get('/getNotes', getNotes)
Router.delete('/deleteNotes/:id', deleteNotes)
module.exports = Router