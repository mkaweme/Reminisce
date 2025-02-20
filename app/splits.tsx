import React from "react";
import { Image,ScrollView, StyleSheet } from "react-native";
import Dine from "./components/dine";
import Joy from "./components/joy";
import Nice from "./components/nice";

const SPLITS = [
  { size: "3 Piece DINE | 70CM * 30CM", price: 650, aspectRatio: 2.33 },
  { size: "4 Piece Nice | 90CM * 120CM", price: 780, aspectRatio: 1.33 },
  { size: "4 Piece Joy | 70CM * 120CM", price: 750, aspectRatio: 1.71 },
  { size: "5 Piece Sweet | 90CM * 150CM", price: 850, aspectRatio: 1.66 },
  { size: "6 Piece Home | 3 * 50CM L * 25CM W | 3 * 25CM * 25CM", price: 780, aspectRatio: 2 },
];
const Splits = () => {
    
  return (
    <ScrollView style={styles.container} contentContainerStyle={{ justifyContent: "center", }}>
      <Image source={{ uri: "https://picsum.photos/200/300" }} style={styles.image} />
      <Dine />
      <Joy />
      <Nice />
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