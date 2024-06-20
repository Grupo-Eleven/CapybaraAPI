const express = require('express')
const app = express()

const port = 3000 

const webRoutes = require('./routes/routes')

app.use(webRoutes) 

app.get('/', (req, res) => {
    res.send('¡Hola, mundo!');
});

app.listen(port, () => {
    console.log(`Servidor escuchando en http://localhost:${port}`);
});