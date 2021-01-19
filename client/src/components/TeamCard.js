import React from "react";
import { Card, Icon, Image } from "semantic-ui-react";
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
    </Card>
  );
}
