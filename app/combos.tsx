import React from "react";
import {  StyleSheet, ScrollView } from "react-native";
import Cherry from "./components/cherry";
import Time from "./components/time";
import Warm from "./components/warm";
import Moments from "./components/moments";

const Combos: React.FC = () => {

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ justifyContent: "center" }}>
      <Cherry />
      <Warm />
      <Time />
      <Moments />
    </ScrollView>
  );
};

export default Combos;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
