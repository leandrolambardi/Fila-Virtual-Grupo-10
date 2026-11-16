const mongoose = require('mongoose');
const { MONGODB_URI } = require('./config');

// Conexión a MongoDB Atlas con Mongoose.
const conectarBaseDeDatos = async () => {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('[conexion] Conexión a la base de datos establecida.');
  } catch (error) {
    console.log('[conexion] Error al conectar con la base de datos:', error.message);
    process.exit(1);
  }
};

module.exports = conectarBaseDeDatos;