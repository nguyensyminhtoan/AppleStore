const express = require('express')
const router = express.Router()
const isAdmin = require('../middleware/is-admin')
const adminController = require('../controller/admin')
const isAdminOrCtv = require('../middleware/is-admin-or-ctv')
const isAuth = require('../middleware/is-auth')
const { body } = require('express-validator')

router.get('/orders', isAdmin, adminController.getOrders)
router.get('/users', isAdminOrCtv, adminController.getUsers)
router.post('/update-product', [
  body('productName')
    .isLength({ min: 4 })
    .withMessage('product name must contain at least 4 characters'),
  body('price')
    .isLength({ min: 1 })
    .isNumeric()
    .withMessage('you need to fill price'),
  body('category')
    .isLength({ min: 3 })
    .withMessage('category must contain at least 3 characters'),
  body('shortDesc')
    .isLength({ min: 12 })
    .withMessage('short description must contain at least 12 characters'),
  body('longDesc')
    .isLength({ min: 20 })
    .withMessage('long description must contain at least 20 characters'),
  body('quantityInStock')
    .isLength({ min: 1 })
    .withMessage('quantity must content at least 1 number')
], isAuth, isAdmin, adminController.postUpdateProduct)
router.delete('/delete-product', isAuth, isAdmin, adminController.deleteProduct)
router.post('/add-product', [
  body('productName')
    .isLength({ min: 4 })
    .withMessage('product name must contain at least 4 characters'),
  body('price')
    .isLength({ min: 1 })
    .isNumeric()
    .withMessage('you need to fill price'),
  body('category')
    .isLength({ min: 3 })
    .withMessage('category must contain at least 3 characters'),
  body('shortDesc')
    .isLength({ min: 12 })
    .withMessage('short description must contain at least 12 characters'),
  body('longDesc')
    .isLength({ min: 20 })
    .withMessage('long description must contain at least 20 characters'),
  body('quantityInStock')
    .isLength({ min: 1 })
    .withMessage('quantity must content at least 1 number')
], isAuth, isAdmin, adminController.postNewProduct
)

module.exports = router