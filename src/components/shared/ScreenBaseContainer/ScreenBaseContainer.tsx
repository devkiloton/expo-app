import React, { FC } from "react";
import { SafeAreaView } from "react-native";
import { styled } from "styled-components";

interface IScreenBaseContainerProps {
  children: React.ReactNode;
}

export const ScreenBaseContainer: FC<IScreenBaseContainerProps> = React.memo(
  ({ children }) => {
    return (
      // @ts-ignore
      <Container>{children}</Container>
    );
  }
);

const Container = styled(SafeAreaView)<{
  backgroundColor: string;
}>`
  flex: 1;
  align-items: center;
  justify-content: center;
`;
