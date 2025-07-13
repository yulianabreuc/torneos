const mongoose = require('mongoose');

const registrosSchema = new mongoose.Schema(
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
        kilometros: {
            type: Number
        },
        tiempo: {
            type: String // Ejemplo: "00:45:30"
        },
        lugar: {
            type: String
        },
        fecha_registro: {
            type: Date,
            default: Date.now
        }
    },
    {
        versionKey: false
    }
);

module.exports = mongoose.model('registros', registrosSchema, 'registros');
