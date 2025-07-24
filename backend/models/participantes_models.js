const mongoose = require('mongoose');

const participantesShema = new mongoose.Schema(
    {
        id: mongoose.Schema.ObjectId,
        nombre:{
            type: String
        },
        apellido:{
            type: String
        },
        correo:{
            type: String
        },
        cedula:{
            type: String
        },
        telefono:{
            type: String
        },
        edad:{
            type: Number
        },
        sexo:{
            type: String
        },
        pais:{
            type: String
        },
        categoria:{
            type: String
        },
    }
)

module.exports = mongoose.model('participantes', participantesShema, 'participantes')