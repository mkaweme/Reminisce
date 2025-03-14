import React from "react";
import { Image, StyleSheet, View } from "react-native";

const Portrait = () => (
  <View style={styles.container}>
    <Image style={styles.portrait} source={{ uri: "https://picsum.photos/200/300" }} />
  </View>
);

export default Portrait;

const styles = StyleSheet.create({
  container : {
    display: "flex",
    flexDirection: "column",
  },
  portrait: {
    width: 200,
    height: 300,
    margin: 20,
    borderColor: "#FFFFFF",
    borderWidth: 5,
  },
});