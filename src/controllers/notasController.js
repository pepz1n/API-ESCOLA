const service = require('../services/notasService');

const getAll = async (req, res) => {
    try {
        const response = await service.getAllNotas();
        res.status(200).send(response);
    } catch (err) {
        res.status(500).send(err);
    }
}

const getById = async (req, res) => {
    try {
        const response = await service.getNotasById(req.params);
        res.status(200).send(response);
    } catch (err) {
        res.status(500).send(err);
    }
}

const persistir = async (req, res) => {
    try {
        const response = await service.persistirNotas(req.body);
        res.status(200).send(response);
    } catch (err) {
        res.status(500).send(err);
    }
}

const excluir = async (req, res) => {
    try {
        let deletado = await service.excluirNotas(req.params);
        let response = deletado 
            ? `Registro ${req.params.id} deletado com sucesso` 
            : `Não foi encontrado nenhum registro com o id ${req.params.id} para ser deletado`;
        res.status(200).send({ response });
    } catch (err) {
        res.status(500).send(err);
    }
}

module.exports.getAllNotas = getAll;
module.exports.getNotasById = getById;
module.exports.persistirNotas = persistir;
module.exports.excluirNotas = excluir;