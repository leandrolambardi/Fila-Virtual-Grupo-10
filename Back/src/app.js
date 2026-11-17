const express = require('express');
const cors = require('cors');
const { HOST, PORT } = require('./database/config');
const conectarBaseDeDatos = require('./database/conexion');
const turnoRouter = require('./routers/turno.router');

const app = express();

app.use(
  cors({
    origin: ['http://localhost:4200', 'http://127.0.0.1:4200'],
  })
);
app.use(express.json());

app.use('/api/turnos', turnoRouter);

// El servidor escucha recién después de conectar con la base.
const iniciarServidor = async () => {
  await conectarBaseDeDatos();
  app.listen(PORT, HOST, () => {
    console.log(`Servidor escuchando en http://${HOST}:${PORT}`);
  });
};

iniciarServidor();
