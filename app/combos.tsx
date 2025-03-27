import React from "react";
import {  StyleSheet, ScrollView } from "react-native";
import Cherry from "../components/combos/cherry";
import Time from "../components/combos/time";
import Warm from "../components/combos/warm";
import Moments from "../components/combos/moments";
import Fun from "../components/combos/fun";
import Growth from "../components/combos/growth";
import { LinearGradient } from "expo-linear-gradient";
import { Divider } from "@rneui/base";

const Combos: React.FC = () => {

  return (
    <LinearGradient 
      colors={["#80523d", "#b6977b"]} 
      start={{ x:0, y: 0 }} 
      end={{ x: 1, y: 1 }} 
      style={styles.gradientContainer}   
    >
      <ScrollView style={styles.container} contentContainerStyle={{ justifyContent: "center" }}>
        <Cherry />
        <Divider width={1}/>
        <Warm />
        <Divider width={1}/>
        <Time />
        <Divider width={1}/>
        <Moments />
        <Divider width={1}/>
        <Fun />
        <Divider width={1}/>
        <Growth />
      </ScrollView>
    </LinearGradient>
  );
};

export default Combos;

const styles = StyleSheet.create({
  gradientContainer: {
    flex: 1,
    height: "100%",
  },
  container: {
    flex: 1,
  },
});
