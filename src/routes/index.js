const alunos = require('./alunosRoute')
const pessoas = require('./pessoasRoute')
const professores = require('./professoresRoute')
const disciplina = require('./disciplinaRoute')
const notas = require ('./notasRoute')
const mediaRoute = require('./mediaRoute')
const mediaTodosRoute = require('./mediaTodosRoute')


module.exports = (app) =>{
    alunos(app)
    pessoas(app)
    professores(app)
    disciplina(app)
    notas(app)
    mediaRoute(app)
    mediaTodosRoute(app)
}