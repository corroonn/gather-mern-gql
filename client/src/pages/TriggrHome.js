import React, { useState } from "react";
import { useQuery, useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";
import { Button, Form, Grid, Message, Table } from "semantic-ui-react";

import TriggrRow from "../components/TriggerRow";
import { useForm } from "../util/hooks";

export default function TriggrHome() {
  const { loading, data: { getTriggrs: Triggrs } = {} } = useQuery(
    FETCH_TRIGGRS_QUERY
  );
  const [errors, setErrors] = useState({});

  const { onChange, onSubmit, values } = useForm(createTriggrCallback, {
    name: "",
  });

  const [createTriggr, { loadingTriggr }] = useMutation(CREATE_TRIGGR, {
    variables: values,
    update(proxy, result) {
      const data = proxy.readQuery({
        query: FETCH_TRIGGRS_QUERY,
      });
      data.getTriggrs = [result.data.createTriggr, ...data.getTriggrs];

      proxy.writeQuery({ query: FETCH_TRIGGRS_QUERY, data });
      setErrors("");
    },
    onError(err) {
      setErrors(err.graphQLErrors[0].extensions.exception.errors);
    },
  });

  function createTriggrCallback() {
    createTriggr();
    values.name = "";
  }

  const displayErrors = Object.values(errors).map((anError) => (
    <li key={anError}>{anError}</li>
  ));

  return (
    <>
      <Grid columns={12} divided>
        <Grid.Row stretched>
          <Grid.Column width={6}>
            <h1>Create a new triggr.</h1>
            <Form
              onSubmit={onSubmit}
              noValidate
              className={loadingTriggr ? "loading" : ""}
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
        </Grid.Row>

        <Grid.Row>
          <Table>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>Name</Table.HeaderCell>
                <Table.HeaderCell>Count</Table.HeaderCell>
                <Table.HeaderCell>Last Date / Time</Table.HeaderCell>
                <Table.HeaderCell>Last Location</Table.HeaderCell>
                <Table.HeaderCell>Url</Table.HeaderCell>
                <Table.HeaderCell>Status</Table.HeaderCell>
                <Table.HeaderCell></Table.HeaderCell>
              </Table.Row>
            </Table.Header>

            {loading ? (
              <Table.Body>loading...</Table.Body>
            ) : (
              Triggrs && (
                <Table.Body>
                  {Triggrs.map((el) => (
                    <TriggrRow key={el.id} triggr={el} />
                  ))}
                </Table.Body>
              )
            )}
          </Table>
        </Grid.Row>
      </Grid>
    </>
  );
}

const CREATE_TRIGGR = gql`
  mutation createTriggr($name: String!) {
    createTriggr(name: $name) {
      name
      id
      count
      lastEventTime
      lastLocation
      url
      status
      createdAt
      username
    }
  }
`;

const FETCH_TRIGGRS_QUERY = gql`
  {
    getTriggrs {
      id
      name
      count
      lastEventTime
      lastLocation
      url
      status
      createdAt
      username
    }
  }
`;
