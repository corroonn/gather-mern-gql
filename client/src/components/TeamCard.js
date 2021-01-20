import React from "react";
import { Button, Card, Icon, Image } from "semantic-ui-react";
import moment from "moment";

export default function TeamCard({
  props: { name, createdAt, id, title, description },
}) {
  return (
    <Card>
      <Image
        src="https://react.semantic-ui.com/images/avatar/large/matthew.png"
        wrapped
        ui={false}
      />
      <Card.Content>
        <Card.Header>{name}</Card.Header>
        <Card.Meta>
          <span className="date">{moment(createdAt).fromNow()}</span>
        </Card.Meta>
        <Card.Description>{description}</Card.Description>
      </Card.Content>
      <Card.Content extra>
        <Icon name="user" />
        {title}
      </Card.Content>
      <Card.Content extra>
        <div className="ui two buttons">
          <Button basic color="red">
            Delete
          </Button>
          <Button basic color="blue">
            Edit
          </Button>
        </div>
      </Card.Content>
    </Card>
  );
}
