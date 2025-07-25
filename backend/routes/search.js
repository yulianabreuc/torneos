const express = require('express');
const router = express.Router();

const { getSearch } = require('../controllers/searchController.js');

router.get('/', getSearch);


module.exports = router;
