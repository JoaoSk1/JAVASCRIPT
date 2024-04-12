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



const getUserId = async (id) =>{
    const query = 'SELECT usurname, salt, password FROM users WHERE id = $1';
    result = await db.query(query, [id])
    return result.rows[0];
}

const sql_patch =
        `update users
            set `

const patchPassword = async (params) => {
    let binds = []
    let hashedNewPassword;
    const {id, name, password, newPassword} = params
    const userData = await getUserId(id)
    let validorPassword = cript.comparePassword(userData.password,userData.salt, password)
    if(validorPassword){
        validorPassword = cript.comparePassword(userData.password,userData.salt, newPassword)
        if(!validorPassword){
            hashedNewPassword = cript.hashPassword(newPassword, userData.salt)
            let sql = ` password = '${hashedNewPassword}' where id = ${id} `
            binds.push(sql)
            console.log(binds)  
            return await db.query(sql_patch + sql)
        }else{
            console.error('Senha igual');
            return "Nova senha deve ser diferente da senha atual.";
        }
    }else{
       return "Senha inválida.";
    }
}

module.exports.patchPassword = patchPassword
module.exports.newUser = newUser
module.exports.getUser = getUser
module.exports.deleteUser = deleteUser