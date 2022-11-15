const express = require("express");
const login = require("../controllers/auth.js")
const register = require("../controllers/auth.js")
const router = express.Router();


router.post('/register', register.register)
router.post('/login', login.login)


module.exports = router