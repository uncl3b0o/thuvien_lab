const express = require('express');
const router = express.Router();

const userController = require('../app/controllers/UserController');

const authMiddleware = require('../app/middlewares/auth');

router.post('/register', userController.register);
router.post('/login', userController.login);

module.exports = router;