const { Pool } = require("pg")
const pool = new Pool({
  user: "art",
  database: "artdb",
})

module.exports = { pool }
