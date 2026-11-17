const { Router } = require('express');
const turnoController = require('../controllers/turno.controller');

const router = Router();

router.get('/', turnoController.listarTurnos);
router.post('/', turnoController.crearTurno);
router.get('/:id', turnoController.obtenerTurno);

module.exports = router;