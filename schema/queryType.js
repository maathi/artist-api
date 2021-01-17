"use strict"
const {
  arts,
  art,
  users,
  user,
  login,
  checkLiker,
  like,
  checkName,
  userByName,
} = require("../resolvers/query")

const {
  GraphQLList,
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLString,
  GraphQLInt,
  GraphQLID,
} = require("graphql")

const { Art, User } = require("./types")
module.exports = new GraphQLObjectType({
  name: "Query",
  fields: () => ({
    arts: {
      type: GraphQLList(Art),
      resolve: () => arts(),
    },
    art: {
      type: Art,
      args: { id: { type: GraphQLInt } },
      resolve: (source, args) => art(args),
    },
    users: {
      type: GraphQLList(User),
      resolve: (source, args) => users(),
    },
    user: {
      type: User,
      args: { id: { type: GraphQLInt } },
      resolve: (source, args) => user(args),
    },
    userByName: {
      type: User,
      args: { name: { type: GraphQLString } },
      resolve: (source, args) => userByName(args),
    },
    login: {
      type: GraphQLString,
      args: {
        name: { type: GraphQLString },
        password: { type: GraphQLString },
      },
      resolve: (source, args) => login(args),
    },
    checkLiker: {
      type: Art,
      args: {
        artId: { type: GraphQLInt },
        userId: { type: GraphQLInt },
      },
      resolve: (source, args) => checkLiker(args.artId, args.userId),
    },
    like: {
      type: GraphQLInt,
      args: {
        artId: { type: GraphQLInt },
      },
      resolve: (source, args) => like(args.artId),
    },
    checkName: {
      type: User,
      args: {
        name: { type: GraphQLString },
      },
      resolve: (source, args) => checkName(args),
    },
  }),
})
