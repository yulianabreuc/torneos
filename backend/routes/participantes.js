const express = require('express');
const router = express.Router();

const { getParticipantes, createParticipante, relacionarParticipante, removeParticipantesFromCompetencia, deleteParticipante, updateParticipante } = require('../controllers/participantesController.js');

router.get('/', getParticipantes);
router.post('/', createParticipante);
router.post('/competencia', relacionarParticipante);
router.delete('/:id', deleteParticipante);
router.delete('/removeParticipantes/:idParticipante/:idCompetencia', removeParticipantesFromCompetencia);
router.put('/:id', updateParticipante);


module.exports = router;