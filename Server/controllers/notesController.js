const express = require('express');
const Notes = require('../models/notes');
const Router = express.Router();

exports.createNote = async (req, res) => {
    try {
        const createNote = await new Notes({
            Title: req.body.Title,
            Note: req.body.Note,
            Image: req.body.Image,
            Recording: req.body.Recording
        })
        await createNote.save();
        res.send(createNote);
        console.log(createNote);
        return;
    } catch (error) {
        res.send(error);
        console.log(error)
    }
}

exports.deleteNotes = async (req, res) => {
    try {
        const id = req.params.id
        const deleteNotes = await Notes.findByIdAndDelete(id)
        res.send(deleteNotes);
        console.log(deleteNotes)

    } catch (error) {
        res.send(error);
        console.log(error)
    }
}

exports.getNotes = async (req, res) => {
    try {
        const getNotes = await Notes.find({})
        res.send(getNotes);
        console.log(getNotes)
        return;
    } catch (error) {
        res.send(error)
        console.log(error)
    }
}