const express = require('express')
const { createUser, findUser, profile, logout } = require('../controllers/User.controller')
const router = express.Router()


router.route('/register')
    .post(createUser)
router.route('/login')
    .post(findUser)
router.route('/profile')
    .get(profile)
router.route('/logout')
    .get(logout)




module.exports = router 