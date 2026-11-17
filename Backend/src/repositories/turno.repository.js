const mongoose = require('mongoose');
const Turno = require('./models/turno.model');

// Registra el error técnico y lo relanza como un error simple, sin objetos de Mongoose.
const registrarError = (metodo, error) => {
  console.log(`[Repository.${metodo}] ${error.message}`);
  throw new Error(error.message);
};

const listar = async (estado) => {
  try {
    const filtro = estado ? { estado } : {};
    const turnos = await Turno.find(filtro).sort({ numero: 1 }).lean();
    return turnos;
  } catch (error) {
    registrarError('listar', error);
  }
};

const crear = async (datos) => {
  try {
    const turno = await Turno.create(datos);
    return turno.toObject();
  } catch (error) {
    registrarError('crear', error);
  }
};

const buscarPorId = async (id) => {
  try {
    const turno = await Turno.findById(id).lean();
    return turno;
  } catch (error) {
    registrarError('buscarPorId', error);
  }
};

const obtenerUltimoNumero = async () => {
  try {
    const turno = await Turno.findOne().sort({ numero: -1 }).lean();
    return turno ? turno.numero : 0;
  } catch (error) {
    registrarError('obtenerUltimoNumero', error);
  }
};

const esIdValido = (id) => mongoose.isValidObjectId(id);

const actualizarEstado = async (id, datos) => {
  try {
    const turno = await Turno.findByIdAndUpdate(id, datos, { new: true });
    return turno ? turno.toObject() : null;
  } catch (error) {
    registrarError('actualizarEstado', error);
  }
};

module.exports = {
  listar,
  crear,
  obtenerUltimoNumero,
  buscarPorId,
  esIdValido,
  actualizarEstado
};


