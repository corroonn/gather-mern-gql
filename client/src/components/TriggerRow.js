import React from "react";
import { Button, Table } from "semantic-ui-react";

export default function TriggerRow({ triggr }) {
  return (
    <Table.Row key={triggr.id}>
      <Table.Cell>{triggr.name}</Table.Cell>
      <Table.Cell>{triggr.count}</Table.Cell>
      <Table.Cell>{triggr.lastEventTime}</Table.Cell>
      <Table.Cell>{triggr.lastLocation}</Table.Cell>
      <Table.Cell>{triggr.url}</Table.Cell>
      <Table.Cell>
        {triggr.status === false ? (
          <Button basic disabled color="grey">
            Off
          </Button>
        ) : (
          <Button basic color="green">
            On
          </Button>
        )}
      </Table.Cell>
      <Table.Cell>
        <Button basic color="red">
          Delete
        </Button>
        <Button basic color="blue">
          Edit
        </Button>
      </Table.Cell>
    </Table.Row>
  );
}
