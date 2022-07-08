const service = require('../services/pessoasService');

const getAll = async (req, res) => {
    try {
        const response = await service.getAllPessoas();
        res.status(200).send(response);
    } catch (err) {
        res.status(500).send(err);
    }
}

const getById = async (req, res) => {
    try {
        const response = await service.getPessoasById(req.params);
        res.status(200).send(response);
    } catch (err) {
        res.status(500).send(err);
    }
}

const persistir = async (req, res) => {
    try {
        const response = await service.persistirPessoas(req.body);
        res.status(200).send(response);
    } catch (err) {
        res.status(500).send(err);
    }
}

const excluir = async (req, res) => {
    try {
        let deletado = await service.excluirPessoas(req.params);
        let response = deletado 
            ? `Registro ${req.params.id} deletado com sucesso` 
            : `Não foi encontrado nenhum registro com o id ${req.params.id} para ser deletado`;
        res.status(200).send({ response });
    } catch (err) {
        res.status(500).send(err);
    }
}

module.exports.getAllPessoas = getAll;
module.exports.getPessoasById = getById;
module.exports.persistirPessoas = persistir;
module.exports.excluirPessoas = excluir;