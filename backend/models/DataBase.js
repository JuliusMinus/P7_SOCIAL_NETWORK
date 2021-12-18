const mysql = require("mysql2");

const CONFIG = require("../config.js");

const sql = mysql.createConnection(CONFIG.DATABASE_CONFIG);

sql.connect(function (err) {
  if (err) {
    return console.error("error: " + err.message);
  }

  console.log("Connexion à la base de donnée réussie !");
});

module.exports = sql;
