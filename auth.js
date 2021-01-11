const jwt = require("jsonwebtoken")

function authenticate(token) {
  try {
    let user = jwt.verify(token, "key")
    return user
  } catch (err) {
    return null
  }
}

module.exports = { authenticate }
