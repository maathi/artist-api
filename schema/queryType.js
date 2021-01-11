"use strict"
const { arts, art, users, user, login } = require("../resolvers/query")

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
      resolve: (source, args) => user(args.id),
    },
    login: {
      type: GraphQLString,
      args: {
        name: { type: GraphQLString },
        password: { type: GraphQLString },
      },
      resolve: (source, args) => login(args),
    },
  }),
})
