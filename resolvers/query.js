let { getArts, getArt, userArts, checkLiker } = require("../database/arts")
let {
  getUsers,
  getUser,
  getUserByName,
  login,
  checkName,
} = require("../database/users")

let jwt = require("jsonwebtoken")

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

module.exports.userByName = (args) => {
  return getUserByName(args.name)
    .then((res) => res.rows[0])
    .catch((e) => console.error(e.stack))
}

module.exports.login = (args) => {
  return login(args)
    .then((res) => res.rows[0])
    .then((user) => (user ? jwt.sign(user, "key") : null))
    .catch((e) => console.error(e.stack))
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

module.exports.checkLiker = (artId, userId) => {
  console.log(artId, userId)
  return checkLiker(artId, userId)
    .then((res) => res.rows)
    .catch((e) => console.error(e.stack))
}

module.exports.like = async (artId) => {
  let art = await getArt(artId)
  console.log(art)
  let likers = art.fields.filter((f) => f.name == "likers")[0]
  console.log(likers)
  return 3
}

module.exports.checkName = (args) => {
  return checkName(args.name)
    .then((res) => res.rows[0])
    .catch((e) => console.error(e.stack))
}
