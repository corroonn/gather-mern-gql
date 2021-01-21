import gql from "graphql-tag";

export const FETCH_TEAMMEMBERS_QUERY = gql`
  {
    getTeamMembers {
      name
      title
      description
      id
      username
      createdAt
    }
  }
`;
