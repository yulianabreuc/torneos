const mongoose = require('mongoose');

const inscripcionesSchema = new mongoose.Schema(
    {
        id: mongoose.Schema.ObjectId,
        usuario_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'usuarios'
        },
        competencia_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'competencias'
        },
        fecha_inscripcion: {
            type: Date,
            default: Date.now
        }
    },
    {
        versionKey: false
    }
);

module.exports = mongoose.model('inscripciones', inscripcionesSchema, 'inscripciones');
