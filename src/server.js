const { ApolloServer } = require("apollo-server")
const { authenticate } = require("./auth")
const typeDefs = require("./schema/schema")
const resolvers = require("./resolvers/main")
require("dotenv").config()

const PORT = process.env.PORT || "4000"
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => {
    const token = req.headers.authorization || ""

    const user = token ? authenticate(token) : null

    return { user }
  },
})

server.listen(PORT).then(({ url }) => {
  console.log(`Server ready at ${url}`)
})
