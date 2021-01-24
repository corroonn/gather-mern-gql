import React, { useEffect, useState } from "react";
import { useQuery, useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";
import { Button, Form, Grid, Message } from "semantic-ui-react";

import { useForm } from "../util/hooks";

export default function TriggrHome() {
  const { loading, data } = useQuery(FETCH_TRIGGRS_QUERY);
  const [displayTriggrs, setTriggrs] = useState("");
  const [errors, setErrors] = useState({});

  const { onChange, onSubmit, values } = useForm(createTriggrsCallback, {
    name: "",
  });

  const [createTriggr, { loadingTriggr }] = useMutation(CREATE_TRIGGR, {
    variables: values,
    update(proxy, result) {
      const data = proxy.readQuery({
        query: FETCH_TRIGGRS_QUERY,
      });
      data.getTriggrs = [result.data.createTriggr, ...data.getTriggrs];
      console.log(data.getTriggrs);
      proxy.writeQuery({ query: FETCH_TRIGGRS_QUERY, data });
      values.name = "";
      values.title = "";
      values.description = "";
      setErrors("");
    },
    onError(err) {
      setErrors(err.graphQLErrors[0].extensions.exception.errors);
    },
  });

  function createTriggrsCallback() {
    createTriggr();
  }

  const displayErrors = Object.values(errors).map((anError) => (
    <li key={anError}>{anError}</li>
  ));

  useEffect(() => {
    if (!loading) {
      const { getTriggrs: Triggrs } = data;
      const triggrList = Triggrs.map((result) => (
        <li key={result.id}>{result.name}</li>
      ));
      setTriggrs(triggrList);
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

          <Grid.Column width={6}>
            <h3>{values.name}</h3>
          </Grid.Column>
        </Grid.Row>

        <Grid.Row stretched>
          <h1>All triggrs</h1>
        </Grid.Row>
        <Grid.Row>
          {loading ? <div>loading triggrs..</div> : <ul>{displayTriggrs}</ul>}
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
