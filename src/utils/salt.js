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
module.exports.comparePassword = comparePassword;

const user = 'Alexandre Junges'
const password = 'password'
//const salt = generateSalt();
//const hashedPassword = hashPassword(password, salt)

const salt = '48953acbe75c7725d3f0bacd28901f56'
const storedPassword = '2f40713ee38fe929c656dbbee9d360abcc8655ed3b5560320d1ec0e8ab875cdfb060bce570036f29f49e2e608d103a5f6d27341892230e0a94c342ea7ccb9447'

// console.log(salt);
// console.log(hashedPassword)

console.log(comparePassword(storedPassword, salt, password))

// salt: 48953acbe75c7725d3f0bacd28901f56
// password: 2f40713ee38fe929c656dbbee9d360abcc8655ed3b5560320d1ec0e8ab875cdfb060bce570036f29f49e2e608d103a5f6d27341892230e0a94c342ea7ccb9447