const express = require('express');
const router = express.Router();

const libController = require('../app/controllers/LibController');

const authMiddleware = require('../app/middlewares/auth')

router.get('/', libController.showHome)

module.exports = router;