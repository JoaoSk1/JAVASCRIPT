const alunoController = require('../controllers/alunos');

module.exports = (app) => {
    app.get('/aluno', alunoController.getAlunos
        // #swagger.tags = [aluno]
        // #swagger.summary = 'Consulta Lista de ALunos'
        // #swagger.description = 'Consulta Lista de ALunos'
        
        

    )
    app.post('/aluno', alunoController.postAlunos
        // #swagger.tags = [aluno]
    )
    app.delete('/aluno/:id', alunoController.deleteAlunos
        // #swagger.tags = [aluno]
    )
    app.patch('/aluno/:id', alunoController.patchAlunos
        // #swagger.tags = [aluno]
    )
    app.put('/aluno/:id', alunoController.putAlunos
        // #swagger.tags = [aluno]
    )
}