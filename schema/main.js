"use strict"

const { GraphQLSchema } = require("graphql")
const MutationType = require("./mutationType")
const QueryType = require("./queryType")

module.exports = new GraphQLSchema({
  query: QueryType,
  mutation: MutationType,
})
