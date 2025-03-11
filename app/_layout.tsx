import React from "react";
import { Stack } from "expo-router";
import { Provider } from "react-redux";
import store from "./store";

export default function RootLayout() {
  return (
    <Provider store={store}>
      <Stack>
        <Stack.Screen name="combos" options={{ title: "Combos" }} />
        <Stack.Screen name="index" options={{ title: "Home" }} />
        <Stack.Screen name="order" options={{ title: "Order" }} />
        <Stack.Screen name="portraits" options={{ title: "Portraits" }} />
        <Stack.Screen name="products" options={{ title: "Products" }} />
        <Stack.Screen name="splits" options={{ title: "Splits" }} />
        <Stack.Screen name="uploadPortrait" options={{ title: "Upload Portrait" }} />
      </Stack>  
    </Provider>
  );
}