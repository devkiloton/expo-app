import React from "react";
import { Button } from "react-native-paper";
import { CenteredContainerUniversal } from "../../components/shared";
import { styled } from "styled-components";
import { View } from "react-native";
import { useNavigation } from "@react-navigation/core";

export const WelcomeScreen = React.memo(() => {
  const navigation = useNavigation();
  return (
    <CenteredContainerUniversal>
      <ButtonGroup style={{ gap: 8 }}>
        <Button mode="contained" onPress={() => console.log("Pressed")}>
          Access account
        </Button>
        <Button
          mode="contained"
          onPress={() => navigation.navigate<any>("SignUp")}
        >
          Create an account
        </Button>
      </ButtonGroup>
    </CenteredContainerUniversal>
  );
});

const ButtonGroup = styled(View)`
  display: flex;
  flex-direction: column;
  max-width: 300px;
`;
