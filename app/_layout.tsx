import React from "react";
import { Stack } from "expo-router";
import { Provider } from "react-redux";
import store from "./store";

export default function RootLayout() {
  return (
    <Provider store={store}>
      <Stack screenOptions={{ headerTitleAlign: "center" }}>
        <Stack.Screen name="combos" options={{ title: "Combos" }} />
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="+not-found"/>
      </Stack>  
    </Provider>
  );
}