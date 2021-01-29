const { pool } = require("./db")

function getArts() {
  return pool.query("SELECT * FROM arts ORDER BY id DESC")
}

function getArt(id) {
  const text = "SELECT * FROM arts WHERE id = $1"
  const values = [id]
  return pool.query(text, values)
}

function addArt({ name, pic, owner_id, description, rid }) {
  const text =
    "INSERT INTO arts(name, pic, owner_id, description, rid) VALUES($1, $2, $3, $4, $5) RETURNING *"
  const values = [name, pic, owner_id, description, rid]
  return pool.query(text, values)
}

function deleteArt(id, owner_id) {
  const text = "DELETE FROM arts WHERE id = $1 AND owner_id = $2 RETURNING *"
  const values = [id, owner_id]
  return pool.query(text, values)
}

function userArts(id) {
  const text = "SELECT * FROM arts WHERE owner_id = $1"
  const values = [id]
  return pool.query(text, values)
}

function getLikers(artId) {
  const text = "SELECT likers FROM arts WHERE id = $1"
  const values = [artId]
  return pool.query(text, values)
}

function updateLikes(artId, likes) {
  const text = "UPDATE arts SET likes = $2 where id = $1"
  const values = [artId, likes]
  return pool.query(text, values)
}

module.exports = {
  getArts,
  addArt,
  deleteArt,
  getArt,
  userArts,
  getLikers,
}
