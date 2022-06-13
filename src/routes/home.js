const express = require('express');
const router = express.Router();

const homeController = require('../app/controllers/HomeController');

const authMiddleware = require('../app/middlewares/auth')

router.get('/', authMiddleware.checkCookie, homeController.showHome)

module.exports = router;