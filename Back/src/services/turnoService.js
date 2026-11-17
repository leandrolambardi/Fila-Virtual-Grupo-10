const turnoRepository = require('../repositories/turno.repository');

const ESTADOS_VALIDOS = ['en_espera', 'retirado', 'cancelado'];

// Error propio del servicio: lleva el código HTTP y el mensaje del catálogo.
class ErrorTurno extends Error {
  constructor(codigo, mensaje) {
    super(mensaje);
    this.codigo = codigo;
    this.mensaje = mensaje;
  }
}

const lanzarError = (metodo, codigo, mensaje) => {
  console.log(`[Service.${metodo}] ${codigo} ${mensaje}`);
  throw new ErrorTurno(codigo, mensaje);
};

const listarTurnos = async (estado) => {
  if (estado !== undefined && (typeof estado !== 'string' || !ESTADOS_VALIDOS.includes(estado))) {
    lanzarError('listarTurnos', 400, 'El estado indicado no es válido.');
  }
  return turnoRepository.listar(estado);
};

module.exports = {
  ErrorTurno,
  crearTurno,
  listarTurnos
};
