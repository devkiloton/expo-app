import React from "react";
import { ScreenBaseContainer } from "../../components/shared";
import { EventList } from "./components/EventList";

export const Home = React.memo(() => {
  return <EventList />;
});
