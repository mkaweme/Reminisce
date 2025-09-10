import React from "react";
import { Stack } from "expo-router";
import { Provider } from "react-redux";
import store from "./store";
import BebasNeueRegular from "../assets/fonts/BebasNeue-Regular.ttf";
import GaladaRegular from "../assets/fonts/Galada-Regular.ttf";
import Montserrat_Medium from "../assets/fonts/Montserrat/Montserrat-Medium.ttf";
import { useFonts } from "expo-font";
import { StatusBar } from "expo-status-bar";

export default function RootLayout() {

  const [fontsLoaded] = useFonts({
    "BebasNeue-Regular": BebasNeueRegular,
    "Galada-Regular":   GaladaRegular,
    "Montserrat-Medium": Montserrat_Medium,
  });
  
  if (!fontsLoaded) {
    return null;
  };
    
  return (
    <Provider store={store}>
      <StatusBar style="dark" translucent backgroundColor="transparent" />
      <Stack screenOptions={{ headerTitleAlign: "center" }}>
        <Stack.Screen name="index" options={{ title: "Home", headerShown: false }} />
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="+not-found"/>
      </Stack>  
    </Provider>
  );
}; 