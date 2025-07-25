const participantesModel = require('../models/participantes_models');
const competenciasModel = require('../models/competencias_models');

class participantesControllers {
    async getParticipantes(req, res, next) {
        try {
            const participantes = await participantesModel.find();
            res.status(200).send(participantes);
        } catch (err) {
            console.error(err);
            res.status(500).send({ error: 'Error al obtener los participantes' });
        }
    }

    async createParticipante(req, res, next) {
        const { nombre, apellido, correo, cedula, telefono, edad, sexo, pais, categoria } = req.body;
        const newParticipante = {
            nombre,
            apellido,
            correo,
            cedula,
            telefono,
            edad,
            sexo,
            pais,
            categoria
        }
        try {
            const existingParticipante = await participantesModel.findOne({
                $or: [{ correo }, { cedula }]
            });
            if (existingParticipante) {
                return res.status(400).send({ error: 'Correo o cédula ya está en uso' });
            }
            const participanteCreado = await participantesModel.create(newParticipante);
            res.status(201).send(participanteCreado);
        } catch (err) {
            console.error(err);
            res.status(500).send({ error: 'Error al crear el participante' });
        }
    }

    async relacionarParticipante(req, res, next) {
        let { idParticipante, idCompetencia } = req.body
        try {
            //convertir id en ObjectId
            const ObjectId = require('mongoose').Types.ObjectId;
            idCompetencia = new ObjectId(idCompetencia);
            const competencia = await competenciasModel.findById(idCompetencia);
            if (!competencia) {
                return res.status(404).send({ error: 'Competencia no encontrada' });
            }
            //pasar el id a un objeto de mongoose
            idParticipante = new ObjectId(idParticipante);
            const participante = await participantesModel.findById(idParticipante);
            if (!participante) {
                return res.status(404).send({ error: 'Participante no encontrado' });
            }
            competencia.participantes.push(participante);
            await competencia.save();
            res.status(200).send(competencia);
        } catch (err) {
            console.error(err);
            res.status(500).send({ error: 'Error al relacionar el participante con la competencia' });
        }
    }

    async removeParticipantesFromCompetencia(req, res, next) {
        let { idParticipante, idCompetencia } = req.params;
        try {
            // Convertir id en ObjectId
            const ObjectId = require('mongoose').Types.ObjectId;
            idParticipante = new ObjectId(idParticipante);
            idCompetencia = new ObjectId(idCompetencia);

            // Obtener la competencia
            const competencia = await competenciasModel.findById(idCompetencia);

            if (!competencia) {
                return res.status(404).send({ error: 'Competencia no encontrada' });
            }

            // Eliminar el participante específico de la competencia
            competencia.participantes = competencia.participantes.filter(participanteId => !participanteId.equals(idParticipante));
            await competencia.save();

            res.status(200).send({ message: 'Participante eliminado de la competencia' });

        } catch (err) {
            console.error(err);
            res.status(500).send({ error: 'Error al eliminar el participante de la competencia' });
        }
    }

    async deleteParticipante(req, res, next) {
        let { id } = req.params;
        try {
            //convertir id en ObjectId
            const ObjectId = require('mongoose').Types.ObjectId;
            id = new ObjectId(id);
            const participanteEliminado = await participantesModel.findByIdAndDelete(id);
            res.status(200).send(participanteEliminado);
        } catch (err) {
            console.error(err);
            res.status(500).send({ error: 'Error al eliminar el participante' });
        }
    }

    async updateParticipante(req, res, next) {
        let { id } = req.params;
        const { nombre, apellido, correo, cedula, telefono, edad, sexo, pais, categoria } = req.body;
        const newParticipante = {
            nombre,
            apellido,
            correo,
            cedula,
            telefono,
            edad,
            sexo,
            pais,
            categoria
        }
        try {
            //convertir id en ObjectId
            const ObjectId = require('mongoose').Types.ObjectId;
            id = new ObjectId(id);
            const participanteActualizado = await participantesModel.findByIdAndUpdate(id, newParticipante, { new: true });
            res.status(200).send(participanteActualizado);
        } catch (err) {
            console.error(err);
            res.status(500).send({ error: 'Error al actualizar el participante' });
        }
    }

}

module.exports = new participantesControllers();