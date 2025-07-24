const express = require('express');
const router = express.Router();

const { getParticipantes } = require('../controllers/participantesController.js');

router.get('/', getParticipantes);

module.exports = router;