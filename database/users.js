const { pool } = require("./db")

function getUsers() {
  return pool.query("select * from users")
}

function getUser(id) {
  const text = "SELECT * FROM users WHERE id = $1"
  const values = [id]
  return pool.query(text, values)
}

function addUser({ name, password }) {
  const text = "INSERT INTO users(name, password) VALUES($1, $2) RETURNING *"
  const values = [name, password]
  return pool.query(text, values)
}

function deleteUser(id) {
  const text = "DELETE FROM users WHERE id = $1 RETURNING *"
  const values = [id]
  return pool.query(text, values)
}

function login({ name, password }) {
  const text = "SELECT * FROM users WHERE name = $1 AND password = $2"
  const values = [name, password]
  return pool.query(text, values)
}

module.exports = { getUsers, getUser, addUser, deleteUser, login }
