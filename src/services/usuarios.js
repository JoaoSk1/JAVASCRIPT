const db = require('../configs/pg')
const cript = require('../utils/salt')

const sql_insert =
` insert into users (username, salt, password)
                values ($1, $2, $3)`

const newUser = async(params) => {
    const {user, pass} = params
    console.log(params)
    const {salt, hashedPassword} = cript.criarUsuario(pass)
    result = await db.query(sql_insert, [user, salt, hashedPassword])
    return result
}

const sql_get = `select id, username from users`

const getUser = async () => {
    result = await db.query(sql_get, [])
    return {
        total: result.rows.length,
        usuarios: result.rows
    }
}

const sql_delete = `delete from users where id = $1`

const deleteUser = async (params) => {
    return await db.query(sql_delete, [params.id])
}

module.exports.newUser = newUser
module.exports.getUser = getUser
module.exports.deleteUser = deleteUser