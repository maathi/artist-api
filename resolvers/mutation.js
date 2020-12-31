let { addArt, deleteArt, updateOwner } = require("../database/arts")
let { addUser, deleteUser } = require("../database/users")

module.exports.addArt = (args) => {
  return addArt(args)
    .then((res) => res.rows[0])
    .catch((e) => console.error(e.stack))
}

module.exports.deleteArt = (args) => {
  return deleteArt(args.id)
    .then((res) => res.rows[0])
    .catch((e) => console.error(e.stack))
}

module.exports.updateOwner = (args) => {
  return updateOwner(args)
    .then((res) => res.rows[0])
    .catch((e) => console.error(e.stack))
}

module.exports.addUser = (args) => {
  return addUser(args)
    .then((res) => res.rows[0])
    .catch((e) => console.error(e.stack))
}

module.exports.deleteUser = (args) => {
  return deleteUser(args.id)
    .then((res) => res.rows[0])
    .catch((e) => console.error(e.stack))
}
