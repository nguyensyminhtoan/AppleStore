const express = require('express')
const router = express.Router()
const shopController = require('../controller/shop')
const isAuth = require('../middleware/is-auth')

router.get('/products', shopController.getProducts)
router.post('/add-to-cart', isAuth, shopController.postAddToCart)
router.get('/cart', isAuth, shopController.getCart)
router.post('/update-cart', isAuth, shopController.postUpdateCart)
router.get('/remove-item', isAuth, shopController.getRemoveItemFromCart)
module.exports = router