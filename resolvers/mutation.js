let { addArt, deleteArt } = require("../database/arts")
let {
  addUser,
  deleteUser,
  updatePhoto,
  updateIntro,
} = require("../database/users")
let jwt = require("jsonwebtoken")
let yup = require("yup")
const shortid = require("shortid")

module.exports.addArt = async (args) => {
  let schema = yup.object().shape({
    name: yup.string().required().min(4).max(20),
    description: yup.string().max(244),
  })
  let valid = await schema.isValid(({ name, description } = args))
  if (!valid) return

  const rid = shortid.generate()

  return addArt({ ...args, rid })
    .then((res) => res.rows[0])
    .catch((e) => console.error(e.stack))
}

module.exports.deleteArt = (args, user) => {
  return deleteArt(args.id, user.id)
    .then((res) => res.rows[0])
    .catch((e) => console.error(e.stack))
}

module.exports.addUser = async (args) => {
  let schema = yup.object().shape({
    name: yup
      .string()
      .required()
      .min(3)
      .max(15)
      .matches(/^[a-z][a-z0-9_]+$/i),
    password: yup.string().required().min(4).max(30),
  })

  let valid = await schema.isValid(args)
  if (!valid) return

  return addUser(args)
    .then((res) => res.rows[0])
    .then((user) => (user ? jwt.sign(user, process.env.SECRET) : null))
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
    .then((user) => (user ? jwt.sign(user, process.env.SECRET) : null))
    .catch((e) => console.error(e.stack))
}

module.exports.updateIntro = (args, user) => {
  return updateIntro(user.id, args.intro)
    .then((res) => res.rows[0])
    .catch((e) => console.error(e.stack))
}
