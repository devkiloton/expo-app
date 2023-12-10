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
      <Container
        style={{
          padding: 8,
        }}
      >
        {children}
      </Container>
    );
  }
);

const Container = styled(SafeAreaView)<{
  backgroundColor: string;
}>`
  flex: 1;
`;
