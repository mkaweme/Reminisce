import React from "react";
import { View, StyleSheet, Text, } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import MaskedView from "@react-native-masked-view/masked-view";

const Test = () => {
  return (
    <LinearGradient 
      colors={["#ff9900", "#ff0000"]} // Adjust gradient colors
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.container}
    >
      <View style={styles.section}>
        <MaskedView
          maskElement={(
            <View
              style={[
                StyleSheet.absoluteFill, 
                { borderWidth : 10, borderRadius: 10, padding: 10 }]}
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
        <Text style={{ fontSize: 26 }}>View</Text>
      </View>  
    </LinearGradient>
  );
};

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

export default Test;