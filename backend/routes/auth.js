const express = require('express')
const router = express.Router()
const { body } = require('express-validator')
const User = require('../model/user')
const authController = require('../controller/auth')
const isAuth = require('../middleware/is-auth')
const isAdminOrCtv = require('../middleware/is-admin-or-ctv')

router.post('/signup', [
  body('email')
    .isEmail()
    .withMessage('Please enter a valid email.')
    .custom((value, { req }) =>
    {
      return User.findOne({ email: value }).then(userDoc =>
      {
        if (userDoc)
        {
          return Promise.reject('E-Mail address already exists!');
        }
      });
    })
    .normalizeEmail(),
  body('password')
    .trim()
    .isLength({ min: 5 })
    .withMessage('Please enter a valid password.'),
  body('userName')
    .trim()
    .isLength({ min: 3 })
    .withMessage('Please enter your name.')

], authController.postSignup)

router.post('/signin', [
  body('email')
    .isEmail()
    .withMessage('Please enter a valid email.')
    .normalizeEmail(),
  body('password')
    .trim()
    .isLength({ min: 5 })
    .withMessage('Please enter a valid password.'),
], authController.postLogin)
router.get('/logout', authController.getLogout)

router.post('/signin-admin', [
  body('email')
    .isEmail()
    .withMessage('Please enter a valid email.')
    .normalizeEmail(),
  body('password')
    .trim()
    .isLength({ min: 5 })
    .withMessage('Please enter a valid password.'),
], authController.postLoginAdmin)

module.exports = router