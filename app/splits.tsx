import React from "react";
import { ScrollView, StyleSheet } from "react-native";
import Dine from "./components/splits/dine";
import Joy from "./components/splits/joy";
import Nice from "./components/splits/nice";
import Sweet from "./components/splits/sweet";
import Home from "./components/splits/home";
import { LinearGradient } from "expo-linear-gradient";

const Splits = () => {
    
  return (
    <ScrollView style={styles.container} contentContainerStyle={{ justifyContent: "center" }}>
      <LinearGradient 
        colors={["#2dcc9f", "#62004d"]} 
        start={{ x:0, y: 0 }} 
        end={{ x: 1, y: 1 }} 
        style={styles.gradientContainer}   
      >
        <Dine />
        <Joy />
        <Nice />
        <Sweet />
        <Home />
      </LinearGradient>
    </ScrollView>
  );
};

export default Splits;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gradientContainer: {
    flex: 1,
    height: "100%",
  },
  image : {
    marginTop: 20,
    width: 200,
    height: 300,
  }
});