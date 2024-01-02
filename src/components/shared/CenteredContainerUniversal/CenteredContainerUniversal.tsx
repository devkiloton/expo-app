import React, { FC } from "react";
import { View } from "react-native";
interface ICenteredContainerUniversalProps {
  children: React.ReactNode;
}

export const CenteredContainerUniversal: FC<ICenteredContainerUniversalProps> =
  React.memo(({ children }) => {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {children}
      </View>
    );
  });
