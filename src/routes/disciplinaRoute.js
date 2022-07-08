
const controller = require('../controllers/disciplinasController');

module.exports = (app) => {
    app.get('/disciplina', controller.getAllDisciplina)
    app.get('/disciplina/:id', controller.getDisciplinaById)
    app.post('/disciplina', controller.persistirDisciplina)
    app.delete('/disciplina/:id', controller.excluirDisciplina)
};