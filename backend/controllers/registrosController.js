const registrosModel = require('../models/registros_model.js');

class registrosController {

    async getRegistros(req, res, next) {
        try {
            const registros = await registrosModel.find().populate([
                { path: 'participantes_id', model: 'participantes' },
                { path: 'competencia_id', model: 'competencias' }
            ]);
            res.status(200).send(registros);
        } catch (err) {
            console.error(err);
            res.status(500).send({ error: 'Error al obtener los registros' });
        }
    }

    async createRegistro(req, res, next) {
        const { participantes_id, competencia_id, kilometros, tiempo, lugar } = req.body;
        const newRegistro = {
            participantes_id,
            competencia_id,
            kilometros,
            tiempo,
            lugar
        };
        try {
            const registroCreado = await registrosModel.create(newRegistro);
            res.status(201).send(registroCreado);
        } catch (err) {
            console.error(err);
            res.status(500).send({ error: 'Error al crear el registro' });
        }
    }

    async deleteRegistro(req, res, next) {
        let { id } = req.params;
        try {
            const ObjectId = require('mongoose').Types.ObjectId;
            id = new ObjectId(id);
            const registroEliminado = await registrosModel.findByIdAndDelete(id);
            res.status(200).send(registroEliminado);
        } catch (err) {
            console.error(err);
            res.status(500).send({ error: 'Error al eliminar el registro' });
        }
    }

    async updateRegistro(req, res, next) {
        let { id } = req.params;
        const { participantes_id, competencia_id, kilometros, tiempo, lugar } = req.body;
        const updatedRegistro = {
            participantes_id,
            competencia_id,
            kilometros,
            tiempo,
            lugar
        };
        try {
            const ObjectId = require('mongoose').Types.ObjectId;
            id = new ObjectId(id);
            const registroActualizado = await registrosModel.findByIdAndUpdate(id, updatedRegistro, { new: true });
            res.status(200).send(registroActualizado);
        } catch (err) {
            console.error(err);
            res.status(500).send({ error: 'Error al actualizar el registro' });
        }
    }
}

module.exports = new registrosController();
