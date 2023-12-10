import React from "react";
import { Text } from "react-native-paper";
import { ScreenBaseContainer } from "../../components/shared";

export const WelcomeScreen = React.memo(() => {
  return (
    <ScreenBaseContainer>
      <Text>WelcomeScreen</Text>
    </ScreenBaseContainer>
  );
});
