import React from "react";
import { Text, useTheme } from "react-native-paper";
import { ScreenBaseContainer } from "../../components/shared";

export const Home = React.memo(() => {
  return (
    <ScreenBaseContainer>
      <Text>Home</Text>
    </ScreenBaseContainer>
  );
});
