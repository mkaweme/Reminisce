import React from "react";
import { ScrollView, StyleSheet } from "react-native";
import Dine from "../../../components/splits/dine";
import Joy from "../../../components/splits/joy";
import Nice from "../../../components/splits/nice";
import Sweet from "../../../components/splits/sweet";
import Home from "../../../components/splits/home";
import { LinearGradient } from "expo-linear-gradient";
import { Divider } from "@rneui/base";

const Splits: React.FC  = () => {
    
  return (
    <LinearGradient 
      colors={["#053046", "#41758f"]} 
      start={{ x:0, y: 0 }} 
      end={{ x: 1, y: 1 }} 
      style={styles.gradientContainer}   
    >
      <ScrollView style={styles.container} contentContainerStyle={{ justifyContent: "center" }}>
        <Dine />
        <Divider width={1}/>
        <Joy />
        <Divider width={1}/>
        <Nice />
        <Divider width={1}/>
        <Sweet />
        <Divider width={1}/>
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