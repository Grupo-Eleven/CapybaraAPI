const { connection } = require("../dbconnect/dbconnect");

exports.getGames = async (req, res) => {
    try {
        const [results, fields] = await connection.query(
            "SELECT * FROM videojuegos",
        );
        res.json(results);
    } catch (err) {
        console.error("Error en la consulta:", err.stack);
        res.status(500).send("Error en la base de datos");
    }
};

exports.getGame = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) {
            return res.status(400).send("ID is required");
        }
        const query = `
            SELECT videojuegos.*, plataforma.nombre AS plataforma_nombre
            FROM videojuegos
            JOIN plataforma ON videojuegos.plataforma = plataforma.id
            WHERE videojuegos.id = ?
        `;
        const [results, fields] = await connection.query(query, [id]);
        if (results.length === 0) {
            return res.status(404).send("Game not found");
        }
        res.json(results[0]);
    } catch (err) {
        console.error("Error en la consulta:", err.stack);
        res.status(500).send("Error en la base de datos");
    }
};

exports.createGame = async (req, res) => {
    const { nombre, url, about, plataforma, categoria, home, img } = req.body;
    const query =
        "INSERT INTO videojuegos (nombre, url, about, plataforma, categoria, home, img) VALUES (?, ?, ?, ?, ?, ?, ?)";
    const values = [nombre, url, about, plataforma, categoria, home, img];
    console.log(values);

    try {
        const [results, fields] = await connection.query(query, values);
        res.status(201).json({
            id: results.insertId,
            nombre,
            url,
            about,
            plataforma,
            categoria,
            home,
            img,
        });
    } catch (err) {
        console.error("Error en la consulta:", err.stack);
        res.status(500).send("Error en la base de datos");
    }
};

exports.editGame = async (req, res) => {
    const { id } = req.params;
    const { nombre, url, about, plataforma, categoria, home, img } = req.body;
    const query =
        "UPDATE videojuegos SET nombre = ?, url = ?, about = ?, plataforma = ?, categoria = ?, home = ?, img = ? WHERE id = ?";
    const values = [nombre, url, about, plataforma, categoria, home, img, id];
    console.log(values);
    try {
        const [results, fields] = await connection.query(query, values);
        if (results.affectedRows === 0) {
            res.status(404).send("Videojuego no encontrado");
            return;
        }
        res.json({ id, nombre, url, about, plataforma, categoria, home, img });
    } catch (err) {
        console.error("Error en la consulta:", err.stack);
        res.status(500).send("Error en la base de datos");
    }
};

exports.deleteGame = async (req, res) => {
    const { id } = req.params;
    const query = "DELETE FROM videojuegos WHERE id = ?";
    const values = [id];

    try {
        const [results, fields] = await connection.query(query, values);
        if (results.affectedRows === 0) {
            res.status(404).send("Videojuego no encontrado");
            return;
        }
        res.json({ message: "Videojuego eliminado" });
    } catch (err) {
        console.error("Error en la consulta:", err.stack);
        res.status(500).send("Error en la base de datos");
    }
};
