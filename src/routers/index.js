const Alunos = require('./alunos');
const Usuarios = require('./usuarios');

module.exports = (app) => {
    Alunos(app)
    Usuarios(app)
}