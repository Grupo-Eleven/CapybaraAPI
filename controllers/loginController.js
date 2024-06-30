const { connection } = require('../dbconnect/dbconnect')
const jtoken = require('jsonwebtoken')
const crypt = require('bcryptjs')
const jwtconfig = require('./../config/jwtconfig.js')

exports.login = async (req, res) => {
    const {user, password} = req.body
    const[[valido]] = await conn.query(`SELECT * FROM users WHERE user = ?`, user)
    console.log(valido)
    if(valido === undefined){
        res.status(404).send('Usuario no encontrado')
    } else if (!(await crypt.compare(password, valido.password))){
        res.status(401).send({auth: false, token: null})
    } else { // Error en clase: escribí "expriresIn" en lugar de "expiresIn" y no se genera bien el token
        let token = jtoken.sign({id: valido.id}, jwtconfig.secretKey, {expiresIn: jwtconfig.tokenExpiresIn})
        res.status(201).send({auth: true, token})
    }
}