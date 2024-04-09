const mongoose = require('mongoose')
const Schema = mongoose.Schema

const messageSchema = new Schema({
  message: { text: { type: String, required: true } },
  sender: {
    type: String,
    required: true
  },
  users: Array,
},
  {
    timestamps: true,
  })
module.exports = mongoose.model('Messages', messageSchema)