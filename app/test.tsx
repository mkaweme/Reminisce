import React from "react";
import { View, StyleSheet, Text, } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import MaskedView from "@react-native-masked-view/masked-view";

const Test = () => {
  return (
   
    <View style={styles.section}>
      <MaskedView
        maskElement={(
          <View
            style={[
              StyleSheet.absoluteFill, 
              { borderWidth : 10, borderRadius: 150, padding: 10 }]}
          ></View>
        )}
        style={[StyleSheet.absoluteFill]}
      >
        <LinearGradient
          colors={["red", "orange"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={[StyleSheet.absoluteFill]}
        >

        </LinearGradient>
      </MaskedView>
      <Text style={{ fontSize: 26 }}> A Masked View</Text>
    </View>  
    
  );
};

export default Test;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
  },
  section: {
    width: 300,
    height: 300,
    backgroundColor: "transparent"
  }
});