import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { PaperProvider } from "react-native-paper";
import { MainBottomTab } from "./src/routes/BottomTab";

export default function App() {
  return (
    <NavigationContainer>
      <PaperProvider>
        <MainBottomTab />
        <StatusBar style="auto" translucent />
      </PaperProvider>
    </NavigationContainer>
  );
}
