
const controller = require('../controllers/alunosControllers');

module.exports = (app) => {
    app.get('/alunos', controller.getAllAlunos)
    app.get('/alunos/:id', controller.getAlunosById)
    app.post('/alunos', controller.persistirAlunos)
    app.delete('/alunos/:id', controller.excluirAlunos)
};