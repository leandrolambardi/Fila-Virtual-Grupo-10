const express = require('express');
const turnoRouter = require('./routers/turnoRouter');
const app = express();


app.use(express.json());

app.use('/api/puestos', turnoRouter);

module.exports = app;