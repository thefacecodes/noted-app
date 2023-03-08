import { View, Text } from "react-native";
import React from "react";
import Dashboard from "../screens/Dashboard";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AddNote from "../screens/AddNote";
import SingleNote from "../screens/SingleNote";
import EditNote from "../screens/EditNote";

const AppStack = () => {
  const Stack = createNativeStackNavigator();
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerTintColor: "white",
          headerStyle: {
            backgroundColor: "black",
          },
        }}
      >
        <Stack.Screen name="Dashboard" component={Dashboard} />
        <Stack.Screen name="AddNote" component={AddNote} />
        <Stack.Screen name="SingleNote" component={SingleNote} />
        <Stack.Screen name="EditNote" component={EditNote} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppStack;
