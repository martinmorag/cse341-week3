const express = require('express');
const router = express.Router();

const peopleController = require('../controllers/people');
const validation = require('../middleware/validate');

router.get('/', peopleController.getAll);

router.get('/:id', peopleController.getSingle);

router.post('/', validation.saveContact, peopleController.createUser);

router.put('/:id', validation.saveContact, peopleController.updateUser);

router.delete('/:d', peopleController.deleteUser);

module.exports = router;