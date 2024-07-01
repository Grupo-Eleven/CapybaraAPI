const { connection } = require('../dbconnect/dbconnect')

exports.getCategories = async (req, res) => {
    try {
        const [results, fields] = await connection.query('SELECT * FROM categoria')
        res.json(results)
    } catch (err) {
        console.error('Error en la consulta:', err.stack)
        res.status(500).send('Error en la base de datos')
    }
};

exports.getPlatforms = async (req, res) => {
    try {
        const [results, fields] = await connection.query('SELECT * FROM plataforma')
        res.json(results)
    } catch (err) {
        console.error('Error en la consulta:', err.stack)
        res.status(500).send('Error en la base de datos')
    }
};