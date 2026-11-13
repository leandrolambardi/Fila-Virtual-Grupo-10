const express = require('express');
const turnoRouter = require('./routers/turnoRouter');
const app = express();


app.use(express.json());

app.use('/', turnoRouter);

module.exports = app;