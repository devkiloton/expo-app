import { Event } from "nostr-tools";
import React, { FC } from "react";
import { MetadataPbKey } from "../types/MetadataPbKey";
import { Avatar, Button, Card, Text } from "react-native-paper";

interface IListItemProps {
  event: Event;
  metadata: MetadataPbKey;
}

export const ListItem: FC<IListItemProps> = React.memo(
  ({ event, metadata }) => {
    return (
      <Card mode="contained" style={{ marginHorizontal: 4 }}>
        <Card.Title
          title={metadata?.name ?? `${event.pubkey.slice(0, 12)}...`}
          subtitle="Card Subtitle"
        />
        <Card.Content>
          <Text variant="bodyMedium">{event.content}</Text>
        </Card.Content>
      </Card>
    );
  }
);
