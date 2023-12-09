import React from "react";
import { View, StyleSheet } from "react-native";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Text, BottomNavigation } from "react-native-paper";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { CommonActions } from "@react-navigation/native";
import { FeedStack } from "../../stacks";
import { Find, Notifications, Post, Profile } from "../../../screens";

const Tab = createBottomTabNavigator();

export const MainBottomTab = React.memo(() => (
  <Tab.Navigator
    screenOptions={{
      headerShown: false,
    }}
    tabBar={({ navigation, state, descriptors, insets }) => (
      <BottomNavigation.Bar
        navigationState={state}
        safeAreaInsets={insets}
        onTabPress={({ route, preventDefault }) => {
          const event = navigation.emit({
            type: "tabPress",
            target: route.key,
            canPreventDefault: true,
          });

          if (event.defaultPrevented) {
            preventDefault();
          } else {
            navigation.dispatch({
              ...CommonActions.navigate(route.name, route.params),
              target: state.key,
            });
          }
        }}
        renderIcon={({ route, focused, color }) => {
          const { options } = descriptors[route.key];
          if (options.tabBarIcon) {
            return options.tabBarIcon({ focused, color, size: 24 });
          }

          return null;
        }}
        getLabelText={({ route }) => {
          const { options } = descriptors[route.key];
          const label =
            options.tabBarLabel !== undefined
              ? options.tabBarLabel.toString()
              : options.title !== undefined
              ? options.title
              : route.name;

          return label;
        }}
      />
    )}
  >
    <Tab.Screen
      name="Feed"
      component={FeedStack}
      options={{
        tabBarLabel: "Feed",
        tabBarIcon: ({ color, size }) => {
          return <Icon name="home" size={size} color={color} />;
        },
      }}
    />
    <Tab.Screen
      name="Find"
      component={Find}
      options={{
        tabBarLabel: "Find",
        tabBarIcon: ({ color, size }) => {
          return <Icon name="magnify" size={size} color={color} />;
        },
      }}
    />
    <Tab.Screen
      name="Post"
      component={Post}
      options={{
        tabBarLabel: "Post",
        tabBarIcon: ({ color, size }) => {
          return <Icon name="plus" size={size} color={color} />;
        },
      }}
    />
    <Tab.Screen
      name="Notifications"
      component={Notifications}
      options={{
        tabBarLabel: "Activity",
        tabBarIcon: ({ color, size }) => {
          return <Icon name="bell-outline" size={size} color={color} />;
        },
      }}
    />
    <Tab.Screen
      name="Profile"
      component={Profile}
      options={{
        tabBarLabel: "Profile",
        tabBarIcon: ({ color, size }) => {
          return <Icon name="baby-face-outline" size={size} color={color} />;
        },
      }}
    />
  </Tab.Navigator>
));
