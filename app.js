const express = require('express')
const app = express()
const { connection } = require('./dbconnect/dbconnect')
const port = 3000

const webRoutes = require('./routes/routes')

app.use('/api', webRoutes);
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:8080');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

app.get('/', async (req, res) => {
  try {
    const [results, fields] = await connection.query('SELECT * FROM plataforma');
    res.json(results);
  } catch (err) {
    console.error('Error en la consulta:', err.stack);
    res.status(500).send('Error en la base de datos');
  }
});

app.listen(port, () => {
    console.log(`Servidor escuchando en http://localhost:${port}`);
});