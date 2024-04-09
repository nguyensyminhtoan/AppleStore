const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
  userName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true
  },
  cart: {
    items: [{
      productId: {
        type: Schema.Types.ObjectId,
        ref: 'Product',
        required: true
      },
      quantity: { type: Number, required: true }
    }],
    totalPrice: {
      type: Number,
      default: 0
    }
  },
  order: [{
    type: Schema.Types.ObjectId,
    ref: 'Order'
  }],
  role: {
    type: String,
    enum: ['customer', 'ctv', 'admin'],
    default: 'customer'
  }
})
module.exports = mongoose.model('User', userSchema)