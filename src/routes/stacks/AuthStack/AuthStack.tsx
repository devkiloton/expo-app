import React, { FunctionComponent } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Home } from "../../../screens/Home";
import { Appbar, useTheme } from "react-native-paper";
import { MainBottomTab } from "../../BottomTab";
import { WelcomeScreen } from "../../../screens";
import { SignUp } from "../../../screens/SignUp";

const Stack = createNativeStackNavigator();

const Header: FunctionComponent<any> = ({ scene, previous, navigation }) => {
  // const { options } = scene;
  // const title =
  //   options.headerTitle !== undefined
  //     ? options.headerTitle
  //     : options.title !== undefined
  //     ? options.title
  //     : scene.route.name;

  return (
    <Appbar.Header>
      {previous ? <Appbar.BackAction onPress={navigation.pop} /> : null}
    </Appbar.Header>
  );
};

export const AuthStack = React.memo(() => {
  const theme = useTheme();
  return (
    <Stack.Navigator
      initialRouteName="WelcomeScreen"
      screenOptions={{
        header: (props) => (
          <Header
            scene={props}
            previous={props.back?.title}
            navigation={props.navigation}
          />
        ),
        contentStyle: {
          backgroundColor: theme.colors.background,
        },
      }}
    >
      <Stack.Screen name="WelcomeScreen" component={WelcomeScreen} />
      <Stack.Screen name="SignUp" component={SignUp} />
      <Stack.Screen name="MainTab" component={MainBottomTab} />
    </Stack.Navigator>
  );
});
