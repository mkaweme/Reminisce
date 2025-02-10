import React from "react";
import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ title: "Home" }} />
      <Stack.Screen name="products" options={{ title: "Products" }} />
      <Stack.Screen name="portraits" options={{ title: "Portraits" }} />
      <Stack.Screen name="uploadPortrait" options={{ title: "Upload Portrait" }} />
    </Stack>  
  );
}
