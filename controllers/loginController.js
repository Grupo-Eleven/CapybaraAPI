const { connection } = require('../dbconnect/dbconnect')
const jtoken = require('jsonwebtoken')
const crypt = require('bcryptjs')
const jwtconfig = require('./../config/jwtconfig.js')

exports.login = async (req, res) => {
    const {user, password} = req.body
    try {
        const [[valido]] = await connection.query('SELECT * FROM users WHERE username = ?', [user])
        console.log(valido)
        if (!valido) {
            return res.status(404).send('Usuario no encontrado')
        }
        const isPasswordValid = await crypt.compare(password, valido.password)
        if (!isPasswordValid) {
            return res.status(401).send({ auth: false, token: null })
        }
        const token = jtoken.sign({ id: valido.id }, jwtconfig.secretKey, { expiresIn: jwtconfig.tokenExpiresIn })
        res.status(200).send({ auth: true, token })
    } catch (error) {
        console.error('Error en el inicio de sesión:', error)
        res.status(500).send('Error en el servidor')
    }
}