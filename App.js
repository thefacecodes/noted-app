import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import { Text, View, Image } from "react-native";
import AddNote from "./screens/AddNote";
import AppStack from "./components/AppStack";
import Dashboard from "./screens/Dashboard";
import Loading from "./screens/Loading";
import { useFonts } from "expo-font";
import AppContext from "./components/AppContext";

export default function App() {
  const [loading, setLoading] = useState(true);
  const [fontsLoaded] = useFonts({
    DM: require("./assets/fonts/DMSans-Regular.ttf"),
    Clash: require("./assets/fonts/ClashDisplay-Variable.ttf"),
  });

  if (!fontsLoaded) {
    return null;
  }
  return (
    <AppContext>
      {loading ? <Loading setLoading={setLoading} /> : <AppStack />}
      <StatusBar style="auto" />
    </AppContext>
  );
}
