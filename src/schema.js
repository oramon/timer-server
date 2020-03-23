const { gql } = require('apollo-server');

const typeDefs = gql`
  type Entry {
    id: ID!
    entryDate: String
    startHour: String
    endHour: String
    user: User!
    creationDate: String
    modificationDate: String
  }

  enum Role {
    COMMON
    ADMIN
    RO_ADMIN
  }

  type User {
    id: ID!
    email: String!
    name: String
    role: Role!
  }

  type Query {
    entry(id: ID!): Entry
    entries: [Entry]
    me: User
    users: [User]
    userEntries(id: ID): [Entry]
  }

  type Mutation {
    addUpdateEntry(id: ID): EntryUpdateResponse
    addUpdateUser(email: String!): UserUpdateResponse
    removeEntry(id: ID!): EntryUpdateResponse
    removeUser(id: ID!): UserUpdateResponse
    login(email: String): String # login token
  }

  type EntryUpdateResponse {
    success: Boolean!
    message: String
    entry: Entry
  }

  type UserUpdateResponse {
    success: Boolean!
    message: String
    user: User
  }
`;

module.exports = typeDefs;
