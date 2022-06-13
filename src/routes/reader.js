const express = require('express');
const router = express.Router();

const readerController = require('../app/controllers/ReaderController');

router.get('/', readerController.index);
router.get('/createdreaders', readerController.create);
router.post('/createdreaders/created', readerController.created);
router.get('/:id/edit', readerController.edited);
router.put('/:id', readerController.updated);
router.delete('/:id', readerController.deleted);
router.get('/search', readerController.search);

module.exports = router;