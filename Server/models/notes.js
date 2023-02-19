const mongoose = require('mongoose')

const notes = new mongoose.Schema({
    Title: { type: String },
    Note: { type: String },
    Image: { type: String },
    Recording: { type: String },
    Label: [{
        type: String
    }]
})

const Notes = mongoose.model('Notes', notes)
module.exports = Notes
