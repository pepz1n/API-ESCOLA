const alunos = require('./alunosRoute')
const pessoas = require('./pessoasRoute')
const professores = require('./professoresRoute')
const disciplina = require('./disciplinaRoute')
const notas = require ('./notasRoute')
const mediaRoute = require('./mediaRoute')


module.exports = (app) =>{
    alunos(app)
    pessoas(app)
    professores(app)
    disciplina(app)
    notas(app)
    mediaRoute(app)
}