const mongoose = require('mongoose');
const Turno = require('./model/turno.model');

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


module.exports = {
  listar,
};


