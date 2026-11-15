require('dotenv').config();
const app = require('./app');
const conectarDB = require('./config/database');

conectarDB();

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Servidor funcionando en puerto ${PORT}`);
});