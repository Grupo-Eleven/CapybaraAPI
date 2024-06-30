const { connection } = require('../dbconnect/dbconnect') 

exports.getGame = (req, res) => {
    connection.query('SELECT * FROM videojuegos', (err, results, fields) => {
        if (err) {
          console.error('Error en la consulta:', err.stack);
          res.status(500).send('Error en la base de datos');
          return;
        }
        res.json(results);
    });
};

exports.createGame = (req, res) => {
    const { nombre, url, plataforma, categoria, img } = req.body;
    const query = 'INSERT INTO videojuegos (nombre, url, plataforma, categoria, img) VALUES (?, ?, ?, ?, ?)';
    const values = [nombre, url, plataforma, categoria, img];

    connection.query(query, values, (err, results, fields) => {
        if (err) {
            console.error('Error en la consulta:', err.stack);
            res.status(500).send('Error en la base de datos');
            return;
        }
        res.status(201).json({ id: results.insertId, nombre, categoria, plataforma, img, url });
    });
};

exports.editGame = (req, res) => {
    const { id } = req.params;
    const { nombre, url, plataforma, categoria, img } = req.body;
    const query = 'UPDATE videojuegos SET nombre = ?, categoria = ?, plataforma = ?, img = ?, url = ? WHERE id = ?';
    const values = [nombre, url, plataforma, categoria, img];

    connection.query(query, values, (err, results, fields) => {
        if (err) {
            console.error('Error en la consulta:', err.stack);
            res.status(500).send('Error en la base de datos');
            return;
        }
        if (results.affectedRows === 0) {
            res.status(404).send('Videojuego no encontrado');
            return;
        }
        res.json({ id, nombre, url, plataforma, categoria, img });
    });
};

exports.deleteGame = (req, res) => {
    const { id } = req.params;
    const query = 'DELETE FROM videojuegos WHERE id = ?';
    const values = [id];

    connection.query(query, values, (err, results, fields) => {
        if (err) {
            console.error('Error en la consulta:', err.stack);
            res.status(500).send('Error en la base de datos');
            return;
        }
        if (results.affectedRows === 0) {
            res.status(404).send('Videojuego no encontrado');
            return;
        }
        res.json({ message: 'Videojuego eliminado' });
    });
};
