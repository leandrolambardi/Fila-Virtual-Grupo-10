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

const obtenerTurno = async (req, res) => {
  try {
    const turno = await turnoService.obtenerTurno(req.params.id);
    res.status(200).json(turno);
  } catch (error) {
    responderError(res, 'obtenerTurno', error);
  }
};

const actualizarEstadoTurno = async (req, res) => {
  try {
    const { estado, equipo } = req.body || {};
    const turno = await turnoService.actualizarEstadoTurno(req.params.id, estado, equipo);
    res.status(200).json(turno);
  } catch (error) {
    responderError(res, 'actualizarEstadoTurno', error);
  }
};

const eliminarTurno = async (req, res) => {
  try {
    await turnoService.eliminarTurno(req.params.id);
    res.status(200).json({ mensaje: 'Turno eliminado correctamente.' });
  } catch (error) {
    responderError(res, 'eliminarTurno', error);
  }
};

module.exports = {
  listarTurnos,
  crearTurno,
  obtenerTurno,
  actualizarEstadoTurno
};