const mongoose = require('mongoose');
require('dotenv').config();
const db_URL = process.env.DATABASE || `mongodb://127.0.0.1:27017/torneosAdmin`


module.exports = () => {
    const conexion = () => {
        mongoose.connect(db_URL)
        .then(() => console.log('Conectooo MongoDB :D'))
        .catch(err => console.error('Error de Conexión: ' + err.stack));
    }
    conexion();
};