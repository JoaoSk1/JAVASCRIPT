const usuarioService = require('../services/usuarios')

const newUser = async (req, res, next) => {
    try {
        const retorno = await usuarioService.newUser(req.body)
        res.status(201).json(retorno)
    } catch (err){
        res.status(500).send(err.message)
    }
}

const getUser = async (req, res, next) => {
    try {
        const retorno = await usuarioService.getUser()
        res.status(200).json(retorno)
    } catch (err){
        res.status(500).send(err.message)
    }
}


const deleteUser = async (req, res, next) => {
    try {
        const retorno = await usuarioService.deleteUser(req.params)
        res.status(204).json(retorno)
    } catch (err){
        res.status(500).send(err.message)
    }
}


module.exports.newUser = newUser
module.exports.getUser = getUser
module.exports.deleteUser = deleteUser