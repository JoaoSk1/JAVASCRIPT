const loginService = require('../services/login')

const login = async (req, res, next) => {
    if (req.params && req.headers.authorization && req.headers.authorization.indexOf('Basic') > -1){
        const basicToken = req.headers.authorization
        token = decodeURIComponent(Buffer.from(basicToken.substr(basicToken.indexOf('Basic') + 6), 'base64'))
        let posPonto = token.indexOf(':')
        req.body.user = token.substr(0, posPonto)
        req.body.pass = token.substr(posPonto + 1)
        
        loginService.login(req.body)
           .then(ret => {
                 res.cookie('auth', ret.token, {
                    sameSite: 'none',
                    secure: true,
                    expires : new Date(Date.now() + 1000 * 60 * 60 * 24 * 7)})
                 res.status(201).json({status: ret.status, usuario: ret.user})    
           })
           .catch(err => res.status(err.status? err.status: 500).json({type:err.type, message: err.message, detail: err.detail}))
    } else {
        res.status(400).json({type: 'ERRO', message: 'LOGIN WITH BASIC AUTH!'})
    }
}

module.exports.login = login