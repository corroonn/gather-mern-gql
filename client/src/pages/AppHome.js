import React, { useEffect, useState } from "react";
import { useQuery, useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";
import {
  Button,
  Card,
  Form,
  Image,
  Icon,
  Grid,
  Message,
} from "semantic-ui-react";
import TeamCard from "../components/TeamCard";

import { useForm } from "../util/hooks";
import { FETCH_TEAMMEMBERS_QUERY } from "../util/graphql";

export default function AppHome() {
  const { loading, data } = useQuery(FETCH_TEAMMEMBERS_QUERY);
  const [displayTeams, setTeams] = useState("");
  const [errors, setErrors] = useState({});

  const { onChange, onSubmit, values } = useForm(createTeamMemberCallback, {
    name: "",
    title: "",
    description: "",
  });

  const [createTeamMember, { loadingMember }] = useMutation(CREATE_TEAMMEMBER, {
    variables: values,
    update(proxy, result) {
      const data = proxy.readQuery({
        query: FETCH_TEAMMEMBERS_QUERY,
      });
      data.getTeamMembers = [
        result.data.createTeamMember,
        ...data.getTeamMembers,
      ];
      console.log(data.getTeamMembers);
      proxy.writeQuery({ query: FETCH_TEAMMEMBERS_QUERY, data });
      values.name = "";
      values.title = "";
      values.description = "";
      setErrors("");
    },
    onError(err) {
      setErrors(err.graphQLErrors[0].extensions.exception.errors);
    },
  });

  function createTeamMemberCallback() {
    createTeamMember();
  }

  const displayErrors = Object.values(errors).map((anError) => (
    <li key={anError}>{anError}</li>
  ));

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
    <>
      <Grid centered columns={12} divided>
        <Grid.Row stretched>
          <Grid.Column width={6}>
            <Form
              onSubmit={onSubmit}
              noValidate
              className={loadingMember ? "loading" : ""}
            >
              <Form.Field>
                <Form.Input
                  label="Name"
                  placeholder="Name"
                  name="name"
                  value={values.name}
                  error={errors.name ? true : false}
                  onChange={onChange}
                />
              </Form.Field>
              <Form.Field>
                <Form.Input
                  label="Title"
                  placeholder="Title"
                  name="title"
                  value={values.title}
                  error={errors.title ? true : false}
                  onChange={onChange}
                />
              </Form.Field>
              <Form.Field>
                <Form.Input
                  label="Description"
                  placeholder="Description"
                  name="description"
                  value={values.description}
                  error={errors.description ? true : false}
                  onChange={onChange}
                />
              </Form.Field>
              <Button type="submit" primary>
                Submit
              </Button>
              {displayErrors.length > 0 && (
                <Message negative>
                  <ul className="list">{displayErrors}</ul>
                </Message>
              )}
            </Form>
          </Grid.Column>

          <Grid.Column width={6}>
            <Card>
              <Image
                src="https://react.semantic-ui.com/images/avatar/large/matthew.png"
                wrapped
                ui={false}
              />
              <Card.Content>
                <Card.Header>{values.name}</Card.Header>
                <Card.Description>{values.description}</Card.Description>
              </Card.Content>
              <Card.Content extra>
                <Icon name="user" />
                {values.title}
              </Card.Content>
            </Card>
          </Grid.Column>
        </Grid.Row>

        <Grid.Row stretched>
          <h1>All team members</h1>
        </Grid.Row>
        <Grid.Row>
          {loading ? (
            <div>loading team..</div>
          ) : (
            <Card.Group itemsPerRow={4}>{displayTeams}</Card.Group>
          )}
        </Grid.Row>
      </Grid>
    </>
  );
}

const CREATE_TEAMMEMBER = gql`
  mutation createTeamMember(
    $name: String!
    $title: String!
    $description: String!
  ) {
    createTeamMember(name: $name, title: $title, description: $description) {
      id
      name
      title
      description
      createdAt
      username
    }
  }
`;
