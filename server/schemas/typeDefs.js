const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type Book {
    bookId: Int
    authors(name: String): [String]
    description: String!
    title: String!
    image: String!
    link: String!
  }

  type User {
    _id: ID
    username: String
    email: String
    bookCount: String
    savedBooks: [Book]!
  }

  type Auth {
    token: ID!
    user: User
  }

input ParameterInput{
    authors: [String]!
    description: String!
    title: String!
    bookId: String!
    image: String!
    link: String!
}

  type Query {
      me: User
   }

  type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    saveBook(input: ParameterInput): User
    removeBook(bookId: String!): User
  }
`;

module.exports = typeDefs;


