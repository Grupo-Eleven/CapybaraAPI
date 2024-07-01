const mysql = require('mysql2')

const pool = mysql.createConnection({
    host: 'sql10.freesqldatabase.com',
    user: 'sql10717136',
    password: '4t2BfDcR8D',
    database: 'sql10717136',
    port: 3306,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

pool.promise().connect((err) => {
    if (err) {
        console.error('Error connecting: ' + err.stack)
        return;
    }
    console.log('Connected as id ' + connection.threadId)
});

module.exports = {
    connection: pool.promise()
}