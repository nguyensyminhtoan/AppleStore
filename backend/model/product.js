const mongoose = require('mongoose')
const Schema = mongoose.Schema

const productsSchema = Schema({
  img1: {
    type: String,
    required: false
  },
  img2: {
    type: String,
    required: false
  },
  img3: {
    type: String,
    required: false
  },
  img4: {
    type: String,
    required: false
  },
  category: {
    type: String,
    required: true
  },
  long_desc: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  short_desc: {
    type: String,
    required: true
  },
  quantityInStock: {
    type: Number,
    required: true,
    min: 0
  },
})
module.exports = mongoose.model('Product', productsSchema)