const express = require('express')
const user = require('./funciones')

const router = express.Router()

router.post('/login', user.login)
router.post('/create', user.createUser)

module.exports = router