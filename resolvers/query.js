let { getArts, getArt, userArts } = require("../database/arts")
let { getUsers, getUser, login } = require("../database/users")

module.exports.arts = () => {
  return getArts()
    .then((res) => res.rows)
    .catch((e) => console.error(e.stack))
}

module.exports.art = (args) => {
  return getArt(args.id)
    .then((res) => res.rows[0])
    .catch((e) => console.error(e.stack))
}

module.exports.searchArts = (args) => {
  if (args.query == "") return []
  return
}

module.exports.users = () => {
  return getUsers()
    .then((res) => res.rows)
    .catch((e) => console.error(e.stack))
}

module.exports.user = (id) => {
  return getUser(id)
    .then((res) => res.rows[0])
    .catch((e) => console.error(e.stack))
}

module.exports.login = (args) => {
  return (
    login(args)
      .then((res) => res.rows[0])
      // .then((user) => (user ? { ...user, token: jwt.sign(user, "key") } : null))
      .catch((e) => console.error(e.stack))
  )
}

module.exports.userArts = (parent) => {
  return userArts(parent.id)
    .then((res) => res.rows)
    .catch((e) => console.error(e.stack))
}

module.exports.artOwner = (parent) => {
  return artOwner(parent.id)
    .then((res) => res.rows)
    .catch((e) => console.error(e.stack))
}
