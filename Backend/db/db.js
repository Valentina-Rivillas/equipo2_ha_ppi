const mysql = require('mysql');
const mysqlConnection = mysql.createConnection({
  host: 'bc57rdhmuolcz5ct2soz-mysql.services.clever-cloud.com',
  user: 'ugbftpft5ynjckbf',
  password: 'KYVY9QHsYY4xhU2Jb8Zm',
  database: 'bc57rdhmuolcz5ct2soz',
  multipleStatements: true
});
mysqlConnection.connect(function (err) {
  if (err) {
    console.error(err);
    return;
  } else {
    console.log('base de datos conectada!');
  }
});

module.exports = mysqlConnection;