import React from "react";
import { Stack } from "expo-router";

export default function RootLayout() {

  return (
    <Stack screenOptions={{ headerTitleAlign: "center" }}>
      <Stack.Screen name="index" options={{ title: "Products" }} />
      <Stack.Screen name="combos" options={{ title: "Combos" }} />
      <Stack.Screen name="splits" options={{ title: "Splits" }} />
      <Stack.Screen name="portraits" options={{ title: "Portraits" }} />
      <Stack.Screen name="hexagons" options={{ title: "Hexagons" }} />
      <Stack.Screen name="uploadCombo" options={{ title: "Upload Combo" }} />
      <Stack.Screen name="uploadPortrait" options={{ title: "Upload Portrait" }} />
      <Stack.Screen name="uploadSplit" options={{ title: "Upload Split" }} />
      <Stack.Screen name="+not-found"/>
    </Stack>  
  );
}