import React from "react";
import { Text } from "react-native-paper";
import { ScreenBaseContainer } from "../../components/shared";
import { EventList } from "./components/EventList";

export const Home = React.memo(() => {
  return (
    <ScreenBaseContainer>
      <Text>Home</Text>
      <EventList />
    </ScreenBaseContainer>
  );
});
