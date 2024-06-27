const express = require('express')
const app = express()
const sql = require('./dbconnect/dbconnect')
const port = 3000

const webRoutes = require('./routes/routes')

app.use('/api', webRoutes);

app.get('/', (req, res) => {
    sql.query('SELECT * FROM plataforma', (err, results, fields) => {
      if (err) {
        console.error('Error en la consulta:', err.stack);
        res.status(500).send('Error en la base de datos');
        return;
      }
      res.json(results);
    });
  });

app.listen(port, () => {
    console.log(`Servidor escuchando en http://localhost:${port}`);
});