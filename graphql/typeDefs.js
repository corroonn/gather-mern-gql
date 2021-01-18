const { gql } = require("apollo-server");

module.exports = gql`
  type TeamMember {
    id: ID!
    name: String!
    title: String!
    description: String!
    createdAt: String!
  }
  input RegisterInput {
    username: String!
    password: String!
    confirmPassword: String!
    email: String!
  }
  type User {
    id: ID!
    email: String!
    token: String!
    username: String!
    createdAt: String!
  }
  type Query {
    getTeamMember: [TeamMember]
  }
  type Mutation {
    register(registerInput: RegisterInput): User!
    login(username: String!, password: String!): User!
  }
`;
