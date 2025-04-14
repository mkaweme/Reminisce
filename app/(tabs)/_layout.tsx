import React from "react";
import { Tabs } from "expo-router";
import Feather from "@expo/vector-icons/Feather";
import Entypo from "@expo/vector-icons/Entypo";
import { Platform, Text } from "react-native";
import { useSelector } from "react-redux";
import { RootState } from "app/store";

const _layout = () => {

  const cart = useSelector((state: RootState) => state.cart);
    
  return (
    <Tabs screenOptions={{ tabBarStyle: { 
      position: "absolute", 
      height:  Platform.OS === "ios" ? 70 : 55, 
      backgroundColor: "#ffffff" 
    } }}
    >
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
            <>
              {cart.items.length > 0 && ( 
                <Text style={styles.cartNumber}>
                  {cart.items.length}
                </Text>
              )}
              <Feather name="shopping-cart" size={24} color={color} />
            </>
          ),
        }} 
      />
    </Tabs>
  );
};

export default _layout;

const styles = {
  cartNumber: {
    position: "absolute" as const,
    top: -4,
    right: -8,
    width: 20,
    backgroundColor: "#b90e0aee",
    color: "#ffffff",
    textAlign: "center" as const,
    borderRadius: 10,
    zIndex: 1,
    fontSize: 12,
  },
};