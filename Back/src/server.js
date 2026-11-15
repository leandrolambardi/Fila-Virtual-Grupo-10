require('dotenv').config();

const app = require('./app');
const conectarDB = require('./config/database');

conectarDB();

const Turno = require('./models/turnoModel');

const pruebaMongo = async () => {
    try {
        const turno = await Turno.create({
            numero: 1,
            nombre: "Evelyn Prueba",
            dni: "12345678",
            curso: "3A"
        });

        console.log("✅ Documento creado");
        console.log(turno);
    } catch (error) {
        console.error(error);
    }
};

pruebaMongo();

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(` Servidor funcionando en puerto ${PORT}`);
});