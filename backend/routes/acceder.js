const express = require('express');
const router = express.Router();

const {verificar, registrar} = require('../controllers/accederController.js');

router.post('/login' ,verificar);
router.post('/register' ,registrar);

module.exports = router;