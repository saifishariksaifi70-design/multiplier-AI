
const express = require('express');

const { userLogin, userRegister } = require('../controller/userController.js');

const router = express.Router();

// Register API
router.post('/register', userRegister);

// Login API
router.post('/login', userLogin);

module.exports = router;
