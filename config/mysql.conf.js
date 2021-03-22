let mysql =require(`mysql2`)
const pool = mysql.createPool({
    connectionLimit: 10,
    host: process.env.MH_HOST,
    user: process.env.MH_USER,
    password: process.env.MH_PASSWORD,
    database: process.env.MH_DATABASE,
    port: process.env.MH_PORT
})

pool.getConnection((err, connection) => {
    if (err) {
      if (err.code === "PROTOCOL_CONNECTION_LOST") {
        console.error("Database connection was closed.");
      }
      if (err.code === "ER_CON_COUNT_ERROR") {
        console.error("Database has too many connections.");
      }
      if (err.code === "ECONNREFUSED") {
        console.error("Database connection was refused.");
      }
    }

    if (connection) connection.release();
    return;
  });

module.exports = pool.promise();