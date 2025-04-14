import { StyleSheet, Text, View, } from "react-native";
import React from "react";
import { LinearGradient } from "expo-linear-gradient";

const Details = ({ price, size,  }: { price: number, size: string,  }) => {

  return (
    <View style={styles.container}>
      <View style={{ flexDirection: "column" }}>
        <Text style={styles.canvasDimensions}>{size}</Text>
      </View>
      <LinearGradient 
        colors={["#34ffc6", "#d900aa" ]} 
        start={{ x:0, y: 0 }} 
        end={{ x: 1, y: 1 }} 
        style={styles.priceContainer}   
      >
        <Text style={styles.text}>K{price}</Text>
      </LinearGradient>
    </View>
  );
};

export default Details;

const styles = StyleSheet.create({
  container: {
    width: 300,
    flexDirection: "row",
    margin: 30,
    alignItems: "center",
    justifyContent: "space-between",
  },
  canvasDimensions: {
    width: 170,
    fontSize: 30,
    fontFamily: "BebasNeue-Regular",
    color: "#ffffff",
    flexWrap: "wrap",
    flexShrink: 1,
  },
  priceContainer: {
    width: 100,
    height: 50,
    fontFamily: "BebasNeue-Regular",
    color: "#ffffff",
    alignItems: "center",
    borderRadius:5,
  },
  text : {
    fontFamily: "BebasNeue-Regular",
    color: "#ffffff",
    fontSize: 40,
    flexWrap: "wrap",
  },
});