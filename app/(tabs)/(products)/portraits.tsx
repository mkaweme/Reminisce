import { Platform, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { Link } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";

const PORTRAITS = [
  { size:"A1", price : 540, aspectRatio: 1.41 },
  { size:"A2", price : 380, aspectRatio: 1.41 },
  { size:"A3", price : 280, aspectRatio: 1.41 },
  { size:"40 X 40", price : 350, aspectRatio: 1 },
  { size:"50 X 50", price : 390, aspectRatio : 1 },
  { size:"30 X 30", price : 280, aspectRatio : 1 },
  { size:"A4 X 2", price : 250, aspectRatio: 1.41 },
];

const Portraits = () => {

  return (
    <LinearGradient 
      colors={["#75606a", "#b39fbc"]} 
      start={{ x:0, y: 0 }} 
      end={{ x: 1, y: 1 }} 
      style={styles.gradientContainer}   
    >
      <ScrollView style={styles.container} contentContainerStyle={{ alignItems: "center" }} >
        <Text style={styles.header}>Select Portrait Size</Text>
        {PORTRAITS.map((portrait, index) => (
          <Link key={index} 
            href={{ 
              pathname:"/uploadPortrait", 
              params: { 
                size: portrait.size, 
                price: portrait.price, 
                aspectRatio: portrait.aspectRatio,
                type: "PORTRAIT",
                name: portrait.size,
              } 
            }} 
            asChild
          >
            <TouchableOpacity style={styles.button}>
              <Text style={styles.buttonText}>{portrait.size}</Text>
              <Text style={styles.buttonText}> : </Text>
              <Text style={styles.buttonText}>K{portrait.price}</Text>
              <View style={styles.triangle}>
              </View>
            </TouchableOpacity>
          </Link>
        ))}
      </ScrollView>
    </LinearGradient>
  );
};

export default Portraits;

const styles = StyleSheet.create({
  gradientContainer: {
    flex: 1,
    alignItems: "center",
    paddingBottom: Platform.OS === "ios" ? 65 : 55,
  },
  container: {
    flex: 1,
    width: "100%",
  },
  header: {
    fontSize: 32,
    fontWeight: "600",
    color: "#ffffff",
    marginVertical: 20,
  },
  button: {
    display: "flex",
    flexDirection: "row",
    margin: 15,
    width: 280,
    height: 60,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#ffffff",
  },
  buttonText: {
    fontSize: 20,
    fontWeight: "bold",
  },
  triangle: {
    width: 0,
    height: 0,
    borderStyle: "solid",
    borderRightWidth: 0,
    borderBottomWidth: 20,
    borderLeftWidth: 35,
    borderRightColor: "green",
    borderBottomColor: "#e5e5e5",
    borderLeftColor: "transparent",
    position: "absolute",
    right: 0,
    bottom: 0,
  },
});