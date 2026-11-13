const express = require('express');
const router = express.Router();

const turnoController = require('../controllers/turnoController');

// Obtener todos los turnos
router.get('/', (req, res) => {
    res.json({
        mensaje: 'Router de turnos funcionando correctamente'
    });
});

module.exports = router;

// Obtener todos los turnos
// Obtener un turno por ID
// Crear un turno
// Actualizar un turno
// Eliminar un turno