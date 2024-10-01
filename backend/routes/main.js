const express = require('express');
const router = express.Router();
const formValidator = require('../validations/formValidations');
const MainService = require('../services/Main.service');

router.get('/getTable', MainService.getTable);
router.post('/addNote', formValidator, MainService.addInTable);
router.post('/updateNote', formValidator, MainService.updateById);
router.delete('/deleteNote', MainService.deleteById);

module.exports = router;