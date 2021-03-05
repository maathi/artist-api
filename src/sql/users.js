const { pool } = require("../config/db")

function getUsers() {
  return pool.query("select * from users")
}

function getUser(id) {
  const text = "SELECT * FROM users WHERE id = $1"
  const values = [id]
  return pool.query(text, values)
}

function getUserByName(name) {
  const text = "SELECT * FROM users WHERE name = $1"
  const values = [name]
  return pool.query(text, values)
}

function getUserByName(name) {
  const text = "SELECT * FROM users WHERE name = $1"
  const values = [name]
  return pool.query(text, values)
}

function addUser({ name, password }) {
  const text =
    "INSERT INTO users(name, password, photo) VALUES($1, $2, $3) RETURNING *"
  const values = [name, password, "3xWegIKJD.jpeg"]
  return pool.query(text, values)
}

function deleteUser(id) {
  const text = "DELETE FROM users WHERE id = $1 RETURNING *"
  const values = [id]
  return pool.query(text, values)
}

function updatePhoto({ id, photo }) {
  const text = "UPDATE users SET photo = $2  WHERE id = $1 RETURNING *"
  const values = [id, photo]
  return pool.query(text, values)
}

function updateIntro(id, intro) {
  const text = "UPDATE users SET intro = $2  WHERE id = $1 RETURNING *"
  const values = [id, intro]
  return pool.query(text, values)
}

function login({ name, password }) {
  const text = "SELECT * FROM users WHERE name = $1 AND password = $2"
  const values = [name, password]
  return pool.query(text, values)
}

function checkName(name) {
  const text = "SELECT * FROM users WHERE name = $1"
  const values = [name]
  return pool.query(text, values)
}

module.exports = {
  getUsers,
  getUser,
  addUser,
  deleteUser,
  login,
  updatePhoto,
  updateIntro,
  checkName,
  getUserByName,
}
