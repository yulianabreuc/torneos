const express = require('express');
const router = express.Router();

const { getCompetencias, newCompetencia, deleteCompetencia, putCompetencia } = require('../controllers/competenciasController.js');

router.get('/', getCompetencias);
router.post('/', newCompetencia);
router.delete('/:id', deleteCompetencia);
router.put('/:id', putCompetencia);

module.exports = router;