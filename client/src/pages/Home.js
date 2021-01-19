import React, { useEffect, useState } from "react";
import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";
import { Grid, Card } from "semantic-ui-react";
import TeamCard from "../components/TeamCard";

export default function Home() {
  const { loading, data } = useQuery(FETCH_TEAMMEMBERS_QUERY);
  const [displayTeams, setTeams] = useState("");

  useEffect(() => {
    if (!loading) {
      const { getTeamMembers: teamMembers } = data;
      const teamList = teamMembers.map((member) => (
        <TeamCard key={member.id} props={member} />
      ));
      setTeams(teamList);
    }
  }, [loading, data]);

  return (
    <Grid columns={3} divided>
      <Grid.Row>
        <h1>All team members</h1>
      </Grid.Row>
      <Grid.Row>
        {loading ? (
          <div>loading team..</div>
        ) : (
          <Card.Group>{displayTeams}</Card.Group>
        )}
      </Grid.Row>
    </Grid>
  );
}

const FETCH_TEAMMEMBERS_QUERY = gql`
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
