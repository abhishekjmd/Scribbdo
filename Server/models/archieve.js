const mongoose = require('mongoose')
const { Schema } = mongoose
const archive = new mongoose.Schema({
  Archive: [{
    type: Schema.Types.ObjectId,
    ref: "Notes"
  }]
})

const Archive = mongoose.model('Archive', archive)
module.exports = Archive