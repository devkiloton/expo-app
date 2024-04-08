import React, { FunctionComponent } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Home } from "../../../screens/Home";
import { Appbar, useTheme } from "react-native-paper";

const Stack = createNativeStackNavigator();

export const FeedStack = React.memo(() => {
  const theme = useTheme();
  return (
    <Stack.Navigator
      initialRouteName="Feed"
      screenOptions={{
        headerShown: false,
        contentStyle: {
          backgroundColor: theme.colors.background,
        },
      }}
    >
      <Stack.Screen name="Home" component={Home} />
    </Stack.Navigator>
  );
});
