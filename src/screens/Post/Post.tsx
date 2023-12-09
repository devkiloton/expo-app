import React from "react";
import { SafeAreaView } from "react-native";
import { Text } from "react-native-paper";

export const Post = React.memo(() => {
  return (
    <SafeAreaView>
      <Text>Post</Text>
    </SafeAreaView>
  );
});
