const express = require('express');
const router = express.Router();

const { getRegistros, createRegistro, deleteRegistro, updateRegistro } = require('../controllers/registrosController.js');

router.get('/', getRegistros);
router.post('/', createRegistro);
router.delete('/:id', deleteRegistro);
router.put('/:id', updateRegistro);


module.exports = router;
