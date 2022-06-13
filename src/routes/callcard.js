const express = require('express');
const router = express.Router();

const callcardController = require('../app/controllers/CallCardController');

router.get('/', callcardController.index);
router.get('/createdcallcard', callcardController.create);
router.post('/createdcallcard/created', callcardController.created);
router.get('/:id/edit', callcardController.edited);
router.put('/:id', callcardController.updated);
router.delete('/:id', callcardController.deleted);
router.get('/search', callcardController.search);

module.exports = router;