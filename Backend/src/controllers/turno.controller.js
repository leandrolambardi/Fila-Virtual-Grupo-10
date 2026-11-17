const turnoService = require('../services/turno.service');

const MENSAJE_ERROR_SERVIDOR = 'Ocurrió un error en el servidor. Intentá de nuevo más tarde.';

const responderError = (res, metodo, error) => {
  if (error.codigo && error.mensaje) {
    console.log(`[Controller.${metodo}] ${error.codigo} ${error.mensaje}`);
    res.status(error.codigo).json({ mensaje: error.mensaje });
    return;
  }
  console.log(`[Controller.${metodo}] 500 ${MENSAJE_ERROR_SERVIDOR}`);
  console.log(`[Controller.${metodo}] ${error.message}`);
  console.log(`[Controller.${metodo}] ${error.stack}`);
  res.status(500).json({ mensaje: MENSAJE_ERROR_SERVIDOR });
};

const listarTurnos = async (req, res) => {
  try {
    const turnos = await turnoService.listarTurnos(req.query.estado);
    res.status(200).json(turnos);
  } catch (error) {
    responderError(res, 'listarTurnos', error);
  }
};

const crearTurno = async (req, res) => {
  try {
    const turno = await turnoService.crearTurno(req.body || {});
    res.status(201).json(turno);
  } catch (error) {
    responderError(res, 'crearTurno', error);
  }
};

module.exports = {
  listarTurnos,
  crearTurno,
};