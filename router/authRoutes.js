
const { getLogin, getSignup, postLogin, postSignup, postLogout } = require('../controllers/auth')

const router = require('express').Router()

router.get('/login', getLogin)
router.post('/login', postLogin)
router.get('/signup', getSignup)
router.post('/signup', postSignup)
router.post('/logout', postLogout)

module.exports = router