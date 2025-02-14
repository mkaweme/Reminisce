import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { Link } from "expo-router";

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
    <View style={styles.constainer}>
      <Text style={styles.header}>Select Portrait Size</Text>
      {PORTRAITS.map((portrait, index) => (
        <Link key={index} 
          href={{ 
            pathname:"/uploadPortrait", 
            params: { 
              size: portrait.size, 
              price: portrait.price, 
              aspectRatio: portrait.aspectRatio 
            } 
          }} 
          asChild
        >
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>{portrait.size}</Text>
            <Text style={styles.buttonText}> : </Text>
            <Text style={styles.buttonText}>K{portrait.price}</Text>
          </TouchableOpacity>
        </Link>
      ))}
    </View>
  );
};

export default Portraits;

const styles = StyleSheet.create({
  constainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#e7d4b4",
  },
  header: {
    fontSize: 30,
    fontWeight: "bold",
  },
  button: {
    display: "flex",
    flexDirection: "row",
    margin: 20,
    width: 200,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 5,
    backgroundColor: "#09759a",
  },
  buttonText: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
  },
});