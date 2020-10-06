const express = require('express');
const router = express.Router();

router.use('/authenticate', require('../app/controllers/authController'));
router.use('/medico', require('../app/controllers/medicoController'));
router.use('/prescricao', require('../app/controllers/prescricaoController'));

module.exports = router