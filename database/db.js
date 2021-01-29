const { Pool, Client } = require("pg")

let connectionString = process.env.DATABASE_URL || "postgres://art:@:/artdb"

const pool = new Pool({
  connectionString,
  // ssl: {
  //   rejectUnauthorized: false,
  // },
})

// const client = new Client({
//   connectionString,
//   ssl: {
//     rejectUnauthorized: false,
//   },
// })

// client
//   .connect()
//   .then((r) => console.log("connected to database"))
//   .catch((err) => console.log("connection errooooooor >>>", err, "<<<"))

module.exports = { pool }
