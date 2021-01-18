const { gql } = require("apollo-server");

module.exports = gql`
  type TeamMember {
    id: ID!
    name: String!
    title: String!
    description: String!
    createdAt: String!
  }
  type Query {
    getTeamMember: [TeamMember]
  }
`;
