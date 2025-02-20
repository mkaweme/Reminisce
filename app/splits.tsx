import React from "react";
import { Image,ScrollView, StyleSheet } from "react-native";
import Dine from "./components/dine";
import Joy from "./components/joy";
import Nice from "./components/nice";
import Sweet from "./components/sweet";
import Home from "./components/home";

const Splits = () => {
    
  return (
    <ScrollView style={styles.container} contentContainerStyle={{ justifyContent: "center", }}>
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