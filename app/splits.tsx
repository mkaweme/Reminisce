import React from "react";
import { ScrollView, StyleSheet } from "react-native";
import Dine from "../components/splits/dine";
import Joy from "../components/splits/joy";
import Nice from "../components/splits/nice";
import Sweet from "../components/splits/sweet";
import Home from "../components/splits/home";
import { LinearGradient } from "expo-linear-gradient";

const Splits: React.FC  = () => {
    
  return (
    <LinearGradient 
      colors={["#253f4b", "#446879"]} 
      start={{ x:0, y: 0 }} 
      end={{ x: 1, y: 1 }} 
      style={styles.gradientContainer}   
    >
      <ScrollView style={styles.container} contentContainerStyle={{ justifyContent: "center" }}>
        <Dine />
        <Joy />
        <Nice />
        <Sweet />
        <Home />
      </ScrollView>
    </LinearGradient>
  );
};

export default Splits;

const styles = StyleSheet.create({
  gradientContainer: {
    flex: 1,
    height: "100%",
  },
  container: {
    flex: 1,
  },
});