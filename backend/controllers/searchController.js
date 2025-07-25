const competenciasModel = require('../models/competencias_models.js');
const participantesModel = require('../models/participantes_models.js');
const registrosModel = require('../models/registros_model.js');


class searchController {

    async getSearch(req, res, next) {
        try {
            const data = req.query;
            let participantes, competencias, registros;
            if (data.participante && data.competencia) {
                participantes = await participantesModel.findById(data.participante);
                //convertir participantes en []
                participantes = [participantes];
                competencias = await competenciasModel.findById(data.competencia);
                //convertir competencias en []
                competencias = [competencias];
                registros = await registrosModel.find({ participantes_id: data.participante });
            } else if (data.participante) {
                participantes = await participantesModel.findById(data.participante);
                //convertir participantes en []
                participantes = [participantes];
                competencias = await competenciasModel.find({ participantes: participantes._id });
                registros = await registrosModel.find({ participantes_id: data.participante });
            } else if (data.competencia) {
                competencias = await competenciasModel.findById(data.competencia);
                //convertir competencias en []
                competencias = [competencias];
                participantes = await participantesModel.find({ competencias: competencias._id });
                registros = await registrosModel.find({ competencia_id: data.competencia });
            }
            res.status(200).send({ participantes, competencias, registros });
        } catch (err) {
            console.error(err);
            res.status(500).send({ error: 'Error al obtener los registros' });
        }
    }
}

module.exports = new searchController();
