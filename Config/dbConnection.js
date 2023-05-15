const mysql = require("mysql");


let conn = mysql.createConnection({
  host: "127.0.0.1",
  user: "root",
  password: "",
  database: 'videgrenier',
  port:"3306",
});

module.exports = conn;