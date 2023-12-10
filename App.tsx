import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { PaperProvider } from "react-native-paper";
import { AuthStack } from "./src/routes/stacks/AuthStack/AuthStack";

export default function App() {
  return (
    <NavigationContainer>
      <PaperProvider>
        <AuthStack />
        <StatusBar style="auto" translucent />
      </PaperProvider>
    </NavigationContainer>
  );
}
