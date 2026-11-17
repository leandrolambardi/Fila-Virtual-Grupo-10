const mongoose = require("mongoose");

const turnoSchema = new mongoose.Schema({
  numero: {
    type: Number,
    required: true
  },

  nombre: {
    type: String,
    required: true
  },

  dni: {
    type: String,
    required: true
  },

  curso: {
    type: String,
    required: true
  },

  estado: {
    type: String,
    enum: ["en_espera", "retirado", "cancelado"],
    default: "en_espera"
  },

  fechaCreacion: {
    type: Date,
    default: Date.now
  },

  fechaRetiro: {
    type: Date,
    default: null
  },

  equipo: {
    type: String,
    default: null
  }
});

module.exports = mongoose.model("Turno", turnoSchema);