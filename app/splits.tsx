import React from "react";
import { ScrollView, StyleSheet } from "react-native";
import Dine from "./components/splits/dine";
import Joy from "./components/splits/joy";
import Nice from "./components/splits/nice";
import Sweet from "./components/splits/sweet";
import Home from "./components/splits/home";

const Splits = () => {
    
  return (
    <ScrollView style={styles.container} contentContainerStyle={{ justifyContent: "center" }}>
      <Dine />
      <Joy />
      <Nice />
      <Sweet />
      <Home />
    </ScrollView>
  );
};

export default Splits;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image : {
    marginTop: 20,
    width: 200,
    height: 300,
  }
});