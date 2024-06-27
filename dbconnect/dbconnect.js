const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '094SQLflso643',
    database: 'capybara'
});

connection.connect((err) => {
    if (err) {
        console.error('Error connecting: ' + err.stack);
        return;
    }
    console.log('Connected as id ' + connection.threadId);
});

module.exports = connection;
// connection.end((err) => {
//     if (err) {
//       console.error('Error cerrando la conexión:', err.stack);
//       return;
//     }
//     console.log('Conexión cerrada');
//   });
  
