import React from "react";
import { Tabs } from "expo-router";
import Feather from "@expo/vector-icons/Feather";
import Entypo from "@expo/vector-icons/Entypo";

const _layout = () => {
  return (
    <Tabs>
      <Tabs.Screen 
        name="(products)" 
        options={{
          headerShown: false,
          title: "Products", 
          tabBarIcon: ({ color }) => (
            <Entypo name="home" size={24} color={color}/>
          ),
        }} 
      />
      <Tabs.Screen 
        name="cart"
        options={{ 
          headerTitleAlign: "center",
          title: "Cart",
          tabBarIcon: ({ color }) => (
            <Feather name="shopping-cart" size={24} color={color} /> 
          ),
        }} 
      />
    </Tabs>
  );
};

export default _layout;