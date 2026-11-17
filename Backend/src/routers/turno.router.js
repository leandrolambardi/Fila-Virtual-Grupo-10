const { Router } = require('express');
const turnoController = require('../controllers/turno.controller');

const router = Router();

router.get('/', turnoController.listarTurnos);
router.post('/', turnoController.crearTurno);
router.get('/:id', turnoController.obtenerTurno);
router.patch('/:id/estado', turnoController.actualizarEstadoTurno);

module.exports = router;