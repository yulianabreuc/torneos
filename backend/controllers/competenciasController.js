const competenciasModel = require('../models/competencias_models.js');

class competenciasController {

    async getCompetencias(req, res, next) {
        try {
            const competencias = await competenciasModel.find().populate({
                path: 'participantes',
                model: 'participantes'
            });
            res.status(200).send(competencias);
        } catch (err) {
            console.error(err);
            res.status(500).send({ error: 'Error al obtener las competencias' });
        }
    }
    async newCompetencia(req, res, next) {
        const { Nombre, Descripcion, FechaCompetencia, FechaLimiteInscripcion, Estado, TotalParticipantes, Participantes } = req.body;
        const newCompetencia = {
            nombre: Nombre,
            descripcion: Descripcion,
            fecha_competencia: FechaCompetencia,
            fecha_limite_inscripcion: FechaLimiteInscripcion,
            estado: Estado,
            total_participantes: TotalParticipantes,
            participantes: Participantes
        }
        try {
            const competenciaCreada = await competenciasModel.create(newCompetencia);
            res.status(201).send(competenciaCreada);
        } catch (err) {
            console.error(err);
            res.status(500).send({ error: 'Error al crear la competencia' });
        }
    }

    async deleteCompetencia(req, res, next) {
        let { id } = req.params;
        try {
            //convertir id en ObjectId
            const ObjectId = require('mongoose').Types.ObjectId;
            id = new ObjectId(id);
            const competenciaEliminada = await competenciasModel.findByIdAndDelete(id);
            res.status(200).send(competenciaEliminada);
        } catch (err) {
            console.error(err);
            res.status(500).send({ error: 'Error al eliminar la competencia' });
        }
    }

    async putCompetencia(req, res, next) {
        let { id } = req.params;
        const { Nombre, Descripcion, FechaCompetencia, FechaLimiteInscripcion, Estado, TotalParticipantes, Participantes } = req.body;
        const newCompetencia = {
            nombre: Nombre,
            descripcion: Descripcion,
            fecha_competencia: FechaCompetencia,
            fecha_limite_inscripcion: FechaLimiteInscripcion,
            estado: Estado,
            total_participantes: TotalParticipantes,
            participantes: Participantes
        }
        try {
            //convertir id en ObjectId
            const ObjectId = require('mongoose').Types.ObjectId;
            id = new ObjectId(id);
            const competenciaActualizada = await competenciasModel.findByIdAndUpdate(id, newCompetencia, { new: true });
            res.status(200).send(competenciaActualizada);
        } catch (err) {
            console.error(err);
            res.status(500).send({ error: 'Error al actualizar la competencia' });
        }
    }
}

module.exports = new competenciasController();