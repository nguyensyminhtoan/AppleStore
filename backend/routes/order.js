const express = require('express')
const isAuth = require('../middleware/is-auth')
const orderController = require('../controller/order')
const router = express.Router()
const { body } = require('express-validator')

router.post('/order', [
  body('buyerInformation.fullName')
    .isLength({ min: 5 })
    .withMessage('Full name is required'),
  body('buyerInformation.email')
    .isEmail()
    .withMessage('Invalid email address'),
  body('buyerInformation.phoneNumber')
    .isLength({ min: 9 })
    .withMessage('Phone number is required'),
  body('buyerInformation.address')
    .isLength({ min: 10 })
    .withMessage('Address is required')
], isAuth, orderController.postOrder)
router.get('/history', isAuth, orderController.getHistoryOrders)
module.exports = router