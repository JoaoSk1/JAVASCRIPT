const db = require('../configs/pg')
const jwt = require('jsonwebtoken')
const cript = require('../utils/salt')
const fs = require('fs')

const sql_get = 
`select users.username,
        users.salt, 
        users.password
   from users
  where users.username = $1 `

const login = async(params) => {
    const{user, pass} = params
    result = await db.query(sql_get, [user])
    if (!result.rows.length) throw new Error("Usuário não existe")
    else {
        const salt = result.rows[0].salt
        const password = result.rows[0].password
        if (cript.comparePassword(password, salt, pass)){
            let perfilAcesso = result.rows[0].username
            const privateKey = fs.readFileSync("./src/private/private_key.pem");
            let token = jwt.sign({perfilAcesso},privateKey, {algorithm: 'RS256', expiresIn: '7d'})
            return {
                status: 'Logado com sucesso!',
                user: result.rows[0].username,
                token: token
            }
        } else {
            throw {status: 400, type: 'WARN', message: 'Senha inválida!', detail: ''}
        }
    }
}

module.exports.login = login