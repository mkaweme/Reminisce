import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Image } from "react-native";
import logo from "../assets/images/logo_2_transparent.png";
import { LinearGradient } from "expo-linear-gradient";
import { Link } from "expo-router";
import { useFonts } from "expo-font";
import BebasNeueRegular from "../assets/fonts/BebasNeue-Regular.ttf";

export default function Index() {
  const [fontsLoaded] = useFonts({
    "BebasNeue-Regular": BebasNeueRegular,
  });

  if (!fontsLoaded) {
    return null;
  }
  
  return (
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
      <Link href="/products" asChild>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>See Products</Text>
        </TouchableOpacity>
      </Link>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    height: "100%",
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
    fontSize: 36,
    fontWeight: "bold",
    fontFamily: "BebasNeue-Regular",
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
    backgroundColor: "#3d7794",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});