const express = require('express')
const { testUserController } = require('../controllers/testcontroller')

const router = express.Router()

router.get('/test-user', testUserController)

module.exports = router;