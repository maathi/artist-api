const { user, userArts } = require("../resolvers/query")

const {
  GraphQLList,
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLString,
  GraphQLInt,
  GraphQLID,
} = require("graphql")

const Art = new GraphQLObjectType({
  name: "ArtType",
  fields: () => ({
    id: {
      type: GraphQLID,
    },
    name: {
      type: GraphQLString,
    },
    pic: {
      type: GraphQLString,
    },
    description: {
      type: GraphQLString,
    },
    owner_id: {
      type: GraphQLInt,
    },
    owner: {
      type: User,
      resolve: (source) => user(source.owner_id),
    },
    likers: {
      type: GraphQLList(GraphQLInt),
    },
  }),
})

const User = new GraphQLObjectType({
  name: "UserType",
  fields: () => ({
    id: {
      type: GraphQLID,
    },
    name: {
      type: GraphQLString,
    },
    password: {
      type: GraphQLString,
    },
    photo: {
      type: GraphQLString,
    },
    intro: {
      type: GraphQLString,
    },
    arts: {
      type: GraphQLList(Art),
      resolve: (source) => userArts(source),
    },
  }),
})

const File = new GraphQLObjectType({
  name: "File",
  description: "A stored file.",
  fields: () => ({
    id: {
      type: GraphQLID,
    },
    path: {
      type: GraphQLString,
    },
    filename: {
      type: GraphQLString,
    },
    mimetype: {
      type: GraphQLString,
    },
  }),
})

module.exports = { Art, User, File }
