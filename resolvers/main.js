const {
  arts,
  art,
  users,
  user,
  userByName,
  userArts,
  login,
  checkName,
} = require("./query")
const {
  addArt,
  deleteArt,
  addUser,
  updatePhoto,
  updateIntro,
} = require("./mutation")

const resolvers = {
  Query: {
    arts: () => arts(),
    art: (parent, args) => art(args),
    users: () => users(),
    user: (parent, args) => user(args),
    userByName: (parent, args) => userByName(args),
    login: (parent, args) => login(args),
    checkName: (parent, args) => checkName(args),
  },
  Mutation: {
    addUser: (parent, args, { user }) => {
      if (!user) return null

      args = {
        ...args,
        owner_id: user.id,
      }
      return addArt(args)
    },
    addArt: (parent, args, { user }) => {
      if (!user) return null

      args = {
        ...args,
        owner_id: user.id,
      }
      return addArt(args)
    },
    deleteArt: async (_, args, { user }) => {
      if (!user) return
      return deleteArt(args, user)
    },
    addUser: (parent, args) => addUser(args),
    updatePhoto: (parent, args, { user }) => {
      if (!user) return null

      args = {
        id: user.id,
        photo: args.photo,
      }
      return updatePhoto(args)
    },
    updateIntro: (parent, args, { user }) => {
      if (!user) return null
      updateIntro(args, user)
    },
  },
  User: {
    arts: (parent) => userArts(parent),
  },
  Art: {
    owner: (parent) => user(parent.owner_id),
  },
}

module.exports = resolvers
