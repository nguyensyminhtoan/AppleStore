const express = require('express')
const isAuth = require('../middleware/is-auth')
const router = express.Router()
const messageController = require('../controller/message')



router.get('/get-message', isAuth, messageController.getMessages)
router.post('/add-message', isAuth, messageController.addMessage)

module.exports = router