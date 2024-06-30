const { connection } = require('../dbconnect/dbconnect') 

exports.getCategories = (req, res) => {
  connection.query('SELECT * FROM categoria', (err, results, fields) => {
        if (err) {
          console.error('Error en la consulta:', err.stack);
          res.status(500).send('Error en la base de datos');
          return;
        }
        res.json(results);
    });
};

exports.getPlatforms = (req, res) => {
  connection.query('SELECT * FROM plataforma', (err, results, fields) => {
        if (err) {
          console.error('Error en la consulta:', err.stack);
          res.status(500).send('Error en la base de datos');
          return;
        }
        res.json(results);
    });
};
