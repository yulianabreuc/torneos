const mongoose = require('mongoose');

const competenciasSchema = new mongoose.Schema(
    {
        id: mongoose.Schema.ObjectId,
        nombre: {
            type: String
        },
        descripcion: {
            type: String
        },
        fecha_inicio: {
            type: Date
        },
        fecha_fin: {
            type: Date
        },
        estado: {
            type: String
        }
    },
    {
        versionKey: false
    }
);

module.exports = mongoose.model('competencias', competenciasSchema, 'competencias');
