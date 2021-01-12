"use strict"
let fs = require("fs")
const {
  addArt,
  deleteArt,
  addUser,
  deleteUser,
  updateOwner,
  updatePhoto,
} = require("../resolvers/mutation")
const {
  GraphQLList,
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLString,
  GraphQLInt,
} = require("graphql")
const { GraphQLUpload } = require("graphql-upload")

const { Art, User, File } = require("./types")
module.exports = new GraphQLObjectType({
  name: "Mutation",
  fields: () => ({
    addArt: {
      type: Art,
      args: {
        name: { type: GraphQLString },
        file: { type: GraphQLNonNull(GraphQLUpload) },
        description: { type: GraphQLString },
      },
      resolve: async (parent, args, { user, storeUpload }) => {
        if (!user) return null

        let pic = await storeUpload(args.file)
        pic = pic.split(".")[0] //remove 'png'
        console.log("the pic :", pic)
        args = {
          name: args.name,
          pic,
          owner_id: user.id,
          description: args.description,
        }
        addArt(args)
      },
    },
    deleteArt: {
      type: Art,
      args: { id: { type: GraphQLInt } },
      resolve: async (_, args, { user }) => {
        if (!user) return

        let art = await deleteArt(args, user)
        if (!art) return
        let path = `uploads/${art.pic}.png`
        fs.unlink(path, (err) => {
          if (err) throw err
          console.log(`${path} was deleted`)
        })
        return art
      },
    },
    addUser: {
      type: User,
      args: {
        name: { type: GraphQLString },
        password: { type: GraphQLString },
      },
      resolve: (_, args) => addUser(args),
    },
    updatePhoto: {
      type: User,
      args: {
        photo: { type: GraphQLUpload },
      },
      resolve: async (parent, args, { user, storeUpload }) => {
        if (!user) return null

        let photo = await storeUpload(args.photo)
        args = {
          id: user.id,
          photo,
        }
        updatePhoto(args)
      },
    },
  }),
})
