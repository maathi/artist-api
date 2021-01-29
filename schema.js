const { gql } = require("apollo-server")

const typeDefs = gql`
  type Art {
    id: ID
    rid: String
    name: String
    pic: String
    description: String
    owner_id: Int
    owner: User
  }

  type User {
    id: ID
    name: String
    password: String
    photo: String
    intro: String
    arts: [Art]
  }

  type Query {
    arts: [Art]
    art(id: Int): Art
    users: [User]
    user(id: Int): User
    userByName(name: String): User
    login(name: String, password: String): String
    checkName(name: String): User
  }

  type Mutation {
    addArt(name: String, pic: String, description: String): Art
    deleteArt(id: Int): Art
    addUser(name: String, password: String): String
    updatePhoto(photo: String): String
    updateIntro(intro: String): User
  }
`
module.exports = typeDefs
