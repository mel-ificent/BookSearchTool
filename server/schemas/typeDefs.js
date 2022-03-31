const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type Book {
    bookId: Int
    name: String!
    authors(name: String): [String]
    description: String!
    title: String!
    image: String!
    link: String!
  }

  type User {
    _id: ID!
    username: String!
    email: String!
    bookCount: Int
    savedBooks(_id: String): [Book]
  }

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    me: [User]
  }

  type Mutation {
    login(email: String!, password: String!): Auth
    addUser(name: String!, email: String!, password: String!): Auth
    saveBook(): User
    removeBook(bookId: String!): User
  }
`;

module.exports = typeDefs;
