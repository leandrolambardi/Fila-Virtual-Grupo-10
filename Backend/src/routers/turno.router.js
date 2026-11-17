const { Router } = require('express');
const turnoController = require('../controllers/turno.controller');

const router = Router();

router.get('/', turnoController.listarTurnos);

module.exports = router;