const { ApolloServer } = require("apollo-server")
const { authenticate } = require("./auth")
const typeDefs = require("./schema")
const resolvers = require("./resolvers/main")

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => {
    const token = req.headers.authorization || ""

    const user = token ? authenticate(token) : null

    return { user }
  },
})
server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`)
})
