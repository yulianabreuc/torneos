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
        fecha_competencia: {
            type: Date
        },
        fecha_limite_inscripcion: {
            type: Date
        },
        estado: {
            type: String
        },
        total_participantes: {
            type: Number
        },
        participantes: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'usuarios'
        }]
    },
    {
        versionKey: false
    }
);

module.exports = mongoose.model('competencias', competenciasSchema, 'competencias');
