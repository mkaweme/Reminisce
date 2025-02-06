import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Image } from "react-native";
import logo from "../assets/images/logo_2.jpg";
import LinearGradient from "react-native-linear-gradient";

export default function Index() {
  return (
    <View>
      <LinearGradient start={{ x:0, y: 0 }} end={{ x: 0, y: 1 }} colors={["#b4baba", "#e7d4aa"]} style={styles.container}>
        <View style={styles.banner}>
          <Image source={logo} width={684} height={766} style={styles.logo}/>
          <View style={styles.divider}></View>
          <Text style={styles.title}>WELCOME TO REMINISCE CANVAS.</Text>
        </View>
        <Text style={styles.text}>
          At Reminisce Canvas we do much more than just print photos on canvas, we work with 
          our customers to create personalized home decor art that they will love and appreciate!
        </Text>
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
    alignItems: "center",
  },
  banner: {
    display: "flex",
    flexDirection: "row",
    marginTop: 80,
    alignItems: "center",
  },
  logo: {
    width: 100,
    height: 125,
  },
  divider: {
    width: 2,
    height: "50%",
    backgroundColor: "#3d7794",
  },
  title: {
    fontSize: 30,
    fontWeight: "900",
    color: "#2c7aa2",
    marginHorizontal: 10,
    width: "60%",
  },
  text: {
    margin: 20,
    fontSize: 16,
    fontFamily: "Inter-Regular",
  }
});