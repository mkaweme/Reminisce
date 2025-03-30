import React from "react";
import { Stack } from "expo-router";
import { Provider } from "react-redux";
import store from "./store";
import BebasNeueRegular from "../assets/fonts/BebasNeue-Regular.ttf";
import GaladaRegular from "../assets/fonts/Galada-Regular.ttf";
import { useFonts } from "expo-font";

export default function RootLayout() {

  const [fontsLoaded] = useFonts({
    "BebasNeue-Regular": BebasNeueRegular,
    "Galada-Regular":   GaladaRegular,
  });
  
  if (!fontsLoaded) {
    return null;
  }
    
  return (
    <Provider store={store}>
      <Stack screenOptions={{ headerTitleAlign: "center" }}>
        <Stack.Screen name="index" options={{ title: "Home" }} />
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="+not-found"/>
      </Stack>  
    </Provider>
  );
}  