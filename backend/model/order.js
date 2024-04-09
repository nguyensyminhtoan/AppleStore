const mongoose = require('mongoose')
const Schema = mongoose.Schema
const orderSchema = new Schema({
  products: [{
    product: { type: Object, required: true },
    quantity: { type: Number, required: true },

  }],
  userId: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  },
  buyerInformation: {
    fullName: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true
    },
    phoneNumber: {
      type: String,
      required: true
    },
    address: {
      type: String,
      required: true
    },
    status: {
      type: String,
      default: 'Pending'
    }
  },
  totalPrice: {
    type: Number,
    required: true
  },
  createAt: {
    type: Date,
    default: Date.now
  }
})
module.exports = mongoose.model('Order', orderSchema)