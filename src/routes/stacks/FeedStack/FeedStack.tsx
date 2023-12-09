import React, { FunctionComponent } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Home } from "../../../screens/Home";
import { TouchableOpacity } from "react-native";
import { Appbar, Avatar } from "react-native-paper";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const Stack = createNativeStackNavigator();

const Header: FunctionComponent<any> = ({ scene, previous, navigation }) => {
  const { options } = scene;
  const title =
    options.headerTitle !== undefined
      ? options.headerTitle
      : options.title !== undefined
      ? options.title
      : scene.route.name;

  return (
    <Appbar.Header>
      {previous ? (
        <Appbar.BackAction onPress={navigation.pop} />
      ) : (
        <TouchableOpacity
          onPress={() => {
            navigation.openDrawer();
          }}
        >
          <Avatar.Image
            size={40}
            source={{
              uri: "https://pbs.twimg.com/profile_images/952545910990495744/b59hSXUd_400x400.jpg",
            }}
          />
        </TouchableOpacity>
      )}
      <Appbar.Content
        title={
          previous ? title : <MaterialCommunityIcons name="twitter" size={40} />
        }
      />
    </Appbar.Header>
  );
};

export const FeedStack = React.memo(() => {
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
      }}
    >
      <Stack.Screen name="Home" component={Home} />
    </Stack.Navigator>
  );
});
