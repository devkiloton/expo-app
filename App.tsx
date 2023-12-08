import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { StyleSheet } from "react-native";
import { PaperProvider } from "react-native-paper";
import Main from "./src/routes/bottom/main/Main";

export default function App() {
  return (
    <NavigationContainer>
      <PaperProvider>
        <Main />
        <StatusBar style="auto" />
      </PaperProvider>
    </NavigationContainer>
  );
}
