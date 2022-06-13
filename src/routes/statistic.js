const express = require('express');
const router = express.Router();

const staController = require('../app/controllers/StatisticController');

router.get('/', staController.index);

module.exports = router;