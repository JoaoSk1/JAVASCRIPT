const alunoService = require('../services/alunos')

const getAlunos = async (req, res, next) => {
    try{
        const retorno = await alunoService.getAlunos()
        res.status(201).json(retorno)
    }catch (err){
        res.status(500).send(err)
    }
}

const postAlunos = async (req, res, next) => {
    try{
        const retorno = await alunoService.postAlunos(req.body)
        res.status(201).json(retorno)
    }catch (err){
        res.status(500).send(err.message)
    }
}

const deleteAlunos = async (req, res, next) => {
    try{
        await alunoService.deleteAlunos(req.params)
        .then(ret => res.status(204).send(ret))
        .catch(err => res.status(500).send(err))
    } catch(err) {
        next(err)
    }
}

const putAlunos = async (req, res, next) => {
    try {
      let params = req.body
      params.id = req.params.id
      await alunoService.putAlunos(params)
      .then(ret => res.status(200).send(ret))
      .catch(err => res.status(500).send(err))
    } catch (err) {
      next(err);
    }
  }
  
  const patchAlunos = async (req, res, next) => {
    try {
      let params = req.body
      params.id = req.params.id
      await alunoService.patchAlunos(params)
      .then(ret => res.status(200).send(ret))
      .catch(err => res.status(500).send(err))
    } catch (err) {
      next(err);
    }
  }

module.exports.patchAlunos = patchAlunos
module.exports.putAlunos = putAlunos
module.exports.postAlunos = postAlunos
module.exports.getAlunos = getAlunos
module.exports.deleteAlunos = deleteAlunos
