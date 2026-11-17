const turnoRepository = require('../repositories/turno.repository');

const ESTADOS_VALIDOS = ['en_espera', 'retirado', 'cancelado'];


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

const crearTurno = async (datos) => {
  const { nombre, dni, curso } = datos || {};
  const faltaCampo = (valor) => typeof valor !== 'string' || valor.trim() === '';
  const faltaDni = dni === undefined || dni === null || (typeof dni === 'string' && dni.trim() === '');

  if (faltaCampo(nombre) || faltaDni || faltaCampo(curso)) {
    lanzarError('crearTurno', 400, 'Completá nombre, DNI y curso.');
  }
  if (typeof dni !== 'string' || !/^\d{7,8}$/.test(dni.trim())) {
    lanzarError('crearTurno', 400, 'El DNI debe tener 7 u 8 dígitos, sin puntos ni espacios.');
  }

  const ultimoNumero = await turnoRepository.obtenerUltimoNumero();

  return turnoRepository.crear({
    numero: ultimoNumero + 1,
    nombre: nombre.trim(),
    dni: dni.trim(),
    curso: curso.trim(),
    estado: 'en_espera',
    fechaCreacion: new Date(),
  });
};

const listarTurnos = async (estado) => {
  if (estado !== undefined && (typeof estado !== 'string' || !ESTADOS_VALIDOS.includes(estado))) {
    lanzarError('listarTurnos', 400, 'El estado indicado no es válido.');
  }
  return turnoRepository.listar(estado);
};

module.exports = {
  ErrorTurno,
  listarTurnos,
  lanzarError,
  crearTurno,
};
