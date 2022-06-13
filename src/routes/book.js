const express = require('express');
const router = express.Router();

const bookController = require('../app/controllers/BookController');

router.get('/', bookController.index);
router.get('/createdbook', bookController.create);
router.post('/createdbook/created', bookController.created);
router.get('/:id/edit', bookController.edited);
router.put('/:id', bookController.updated);
router.delete('/:id', bookController.deleted);
router.get('/search', bookController.search);

module.exports = router;




