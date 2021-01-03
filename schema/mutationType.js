"use strict"

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
        owner_id: { type: GraphQLInt },
        price: { type: GraphQLInt },
        description: { type: GraphQLString },
      },
      resolve: async (parent, args, { storeUpload }) => {
        let pic = await storeUpload(args.file)
        pic = pic.split(".")[0] //remove 'png'
        console.log("the pic :", pic)
        args = {
          name: args.name,
          pic,
          owner_id: args.owner_id,
          price: args.price,
          description: args.description,
        }
        addArt(args)
      },
    },
    deleteArt: {
      type: Art,
      args: { id: { type: GraphQLInt } },
      resolve: (_, args) => () => deleteArt(args),
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
        id: { type: GraphQLInt },
        photo: { type: GraphQLUpload },
      },
      resolve: async (parent, args, { storeUpload }) => {
        let photo = await storeUpload(args.photo)
        args = {
          id: args.id,
          photo,
        }
        updatePhoto(args)
      },
    },
    singleUpload: {
      type: GraphQLNonNull(File),
      args: {
        file: {
          description: "File to store.",
          type: GraphQLNonNull(GraphQLUpload),
        },
      },
      resolve: (parent, { file }, { storeUpload }) => storeUpload(file),
    },
  }),
})
