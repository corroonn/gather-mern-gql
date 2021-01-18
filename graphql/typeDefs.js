const { gql } = require("apollo-server");

// For specifying graphQL format for requests

module.exports = gql`
  type TeamMember {
    id: ID!
    name: String!
    title: String!
    description: String!
    createdAt: String!
    username: String!
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
    getTeamMembers: [TeamMember]
    getTeamMember(teamMemberId: ID!): TeamMember
  }
  type Mutation {
    register(registerInput: RegisterInput): User!
    login(username: String!, password: String!): User!
    createTeamMember(
      name: String!
      title: String!
      description: String!
    ): TeamMember
    deleteTeamMember(teamMemberId: ID!): String!
  }
`;
