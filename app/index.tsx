import React, { useState } from "react";
import { Animated, Pressable, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Image } from "react-native";
import logo from "../assets/images/logo_2_transparent.png";
import { LinearGradient } from "expo-linear-gradient";
import { Link } from "expo-router";

export default function Index() {

  const [bgColor] = useState(new Animated.Value(0));

  const startTransition = (toValue: number) => {
    Animated.timing(bgColor, {
      toValue,
      duration: 300, // Transition duration in ms
      useNativeDriver: false,
    }).start();
  };

  const backgroundColor = bgColor.interpolate({
    inputRange: [0, 1],
    outputRange: ["#3d7794", "#3d779444"], // From blue to red
  });

  return (
    <ScrollView>
      <LinearGradient 
        colors={["#b4baba", "#e7d4aa"]} 
        start={{ x:0, y: 0 }} 
        end={{ x: 1, y: 1 }}  
        style={styles.container}
      >
        <View style={styles.banner}>
          <Image source={logo} width={684} height={766} style={styles.logo}/>
          <View style={styles.divider}></View>
          <Text style={styles.title}>WELCOME TO REMINISCE CANVAS.</Text>
        </View>
        <Text style={styles.text}>
          At Reminisce Canvas we do much more than just print photos on canvas, we work with 
          our customers to create personalized home decor art that they will love and appreciate!
        </Text>
        <Animated.View style={[styles.button, { backgroundColor }]}>
          <Pressable
            onPressIn={() => startTransition(1)}
            onPressOut={() => startTransition(0)}
          
          >
            <Link href="/products" style={styles.buttonText}>See Products</Link>
          </Pressable>
        </Animated.View>
        <Link href="/products" style={styles.button2}>See Products</Link>
        <TouchableOpacity style={styles.button3} onPress={() => console.log("Button pressed")}>
          <Link href="/products" style={styles.buttonText}>See Products</Link>
        </TouchableOpacity>
      </LinearGradient>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    height: "110%",
  },
  banner: {
    display: "flex",
    flexDirection: "column",
    marginTop: 80,
    height: "40%",
    alignItems: "center",
    justifyContent: "space-around",

  },
  logo: {
    width: 100,
    height: 125,
  },
  divider: {
    width: "50%",
    height: 3,
    backgroundColor: "#3d7794",
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#2c7aa2",
    width: "60%",
    textAlign: "center",
  },
  text: {
    margin: 20,
    fontSize: 16,
    fontFamily: "Inter-Regular",
  },
  button: {
    marginTop: 30,
    width: 150,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 50,
    alignSelf: "center",
  },
  button2: {
    marginTop: 30,
    width: 150,
    height: 50,
    backgroundColor: "#3d7794",
    borderRadius: 50,
    alignSelf: "center",
    color: "#FFFFFF",
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 16,
    textAlignVertical: "center",
  },
  button3: {
    marginTop: 30,
    marginBottom: 100,
    width: 150,
    height: 50,
    backgroundColor: "#3d7794",
    borderRadius: 50,
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});