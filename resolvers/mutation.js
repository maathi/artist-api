let { addArt, deleteArt, updateOwner } = require("../database/arts")
let { addUser, deleteUser, updatePhoto } = require("../database/users")

module.exports.addArt = (args) => {
  return addArt(args)
    .then((res) => res.rows[0])
    .catch((e) => console.error(e.stack))
}

module.exports.deleteArt = (args, user) => {
  return deleteArt(args.id, user.id)
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

module.exports.updatePhoto = (args) => {
  return updatePhoto(args)
    .then((res) => res.rows[0])
    .catch((e) => console.error(e.stack))
}
