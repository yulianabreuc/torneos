const participantesModel = require('../models/participantes_models');

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
}

module.exports = new participantesControllers();