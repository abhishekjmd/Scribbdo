const express = require('express');
const { createNote, getNotes, deleteNotes, updateNotes } = require('../controllers/notesController');
const Router = express.Router();

Router.post('/addNotes', createNote);
Router.get('/getNotes', getNotes)
Router.delete('/deleteNotes/:id', deleteNotes)
Router.put('/updateNotes/:id', updateNotes)
module.exports = Router