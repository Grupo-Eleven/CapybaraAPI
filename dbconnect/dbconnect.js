const mysql = require('mysql2');

const pool = mysql.createConnection({
    host: 'sql10.freesqldatabase.com',
    user: 'sql10717136',
    password: '4t2BfDcR8D',
    database: 'sql10717136',
    port: 3306,
    waitForConnections: true,
    connectionLimits: 10,
    queueLimit: 0
});

connection.connect((err) => {
    if (err) {
        console.error('Error connecting: ' + err.stack);
        return;
    }
    console.log('Connected as id ' + connection.threadId);
});

module.exports = {
    connection: pool.promise()
}
// connection.end((err) => {
//     if (err) {
//       console.error('Error cerrando la conexión:', err.stack);
//       return;
//     }
//     console.log('Conexión cerrada');
//   });
  
