const express = require('express');
const router = express.Router();

const { getParticipantes, createParticipante, relacionarParticipante, removeParticipantesFromCompetencia } = require('../controllers/participantesController.js');

router.get('/', getParticipantes);
router.post('/', createParticipante);
router.post('/competencia', relacionarParticipante);
router.delete('/removeParticipantes/:idParticipante/:idCompetencia', removeParticipantesFromCompetencia);


module.exports = router;