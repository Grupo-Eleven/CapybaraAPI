const express = require('express')
const app = express()
const cors = require('cors');
const { connection } = require('./dbconnect/dbconnect')
const port = 3000

const webRoutes = require('./routes/routes')

app.use(express.json())

app.use(cors({
  origin: 'https://capybaragames-vue3.netlify.app',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Accept'],
  credentials: true
}))

app.options('*', cors({
  origin: 'https://capybaragames-vue3.netlify.app',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Accept'],
  credentials: true
}))

app.use('/api', webRoutes)

app.get('/', async (req, res) => {
  try {
    const [results, fields] = await connection.query('SELECT * FROM plataforma')
    res.json(results)
  } catch (err) {
    console.error('Error en la consulta:', err.stack)
    res.status(500).send('Error en la base de datos')
  }
})

app.listen(port, () => {
    console.log(`Servidor escuchando en http://localhost:${port}`)
})