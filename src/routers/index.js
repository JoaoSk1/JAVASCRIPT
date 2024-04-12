const Alunos = require('./alunos');
const Login = require('./login');
const Usuarios = require('./usuarios');

module.exports = (app) => {
    Alunos(app)
    Login(app)
    Usuarios(app)
}