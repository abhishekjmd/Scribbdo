const mongoose = require('mongoose')
const { Schema } = mongoose
const pin = new mongoose.Schema({
    Pin: [{
        type: Schema.Types.ObjectId,
        ref: "Notes"
    }]
})

const Pin = mongoose.model('Pin', pin)
module.exports = Pin