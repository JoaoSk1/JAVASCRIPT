const crypto = require('crypto');

function criarUsuario (senha){
    const salt = generateSalt()
    const hashedPassword = hashPassword(senha, salt)
    return {salt, hashedPassword}
}

function generateSalt(){
    return crypto.randomBytes(16).toString('hex');
}

function hashPassword(password, salt){
    return crypto.pbkdf2Sync(password, salt, 1000, 64, 'sha512').toString('hex');
}

function comparePassword(storedPassword, salt, providedPassword) {
    const hash = hashPassword(providedPassword, salt)
    return hash === storedPassword
}
module.exports.criarUsuario = criarUsuario;