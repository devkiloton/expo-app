import React, { FunctionComponent } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Home } from "../../../screens/Home";
import { Appbar, useTheme } from "react-native-paper";

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
    <Appbar.Header elevated>
      {previous ? <Appbar.BackAction onPress={navigation.pop} /> : null}
    </Appbar.Header>
  );
};

export const FeedStack = React.memo(() => {
  const theme = useTheme();
  return (
    <Stack.Navigator
      initialRouteName="Feed"
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
      <Stack.Screen name="Home" component={Home} />
    </Stack.Navigator>
  );
});
