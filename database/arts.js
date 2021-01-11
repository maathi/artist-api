const { pool } = require("./db")

function getArts() {
  return pool.query("select * from arts")
}

function getArt(id) {
  const text = "SELECT * FROM arts WHERE id = $1"
  const values = [id]
  return pool.query(text, values)
}

function addArt({ name, pic, owner_id, description }) {
  const text =
    "INSERT INTO arts(name, pic, owner_id, description) VALUES($1, $2, $3, $4) RETURNING *"
  const values = [name, pic, owner_id, description]
  return pool.query(text, values)
}

function deleteArt(id) {
  const text = "DELETE FROM arts WHERE id = $1 RETURNING *"
  const values = [id]
  return pool.query(text, values)
}

function userArts(id) {
  const text = "SELECT * FROM arts WHERE owner_id = $1"
  const values = [id]
  return pool.query(text, values)
}

function updateOwner({ artId, ownerId }) {
  const text = "update arts SET owner_id = $1 where id = $2 RETURNING *"
  const values = [ownerId, artId]
  pool.query(text, values).then((res) => console.log(res.rows[0]))
  return pool.query(text, values)
}

module.exports = {
  getArts,
  addArt,
  deleteArt,
  getArt,
  userArts,
  updateOwner,
}
