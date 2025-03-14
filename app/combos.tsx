import React from "react";
import {  StyleSheet, ScrollView } from "react-native";
import Cherry from "./components/combos/cherry";
import Time from "./components/combos/time";
import Warm from "./components/combos/warm";
import Moments from "./components/combos/moments";
import Fun from "./components/combos/fun";
import Growth from "./components/combos/growth";

const Combos: React.FC = () => {

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ justifyContent: "center" }}>
      <Cherry />
      <Warm />
      <Time />
      <Moments />
      <Fun />
      <Growth />
    </ScrollView>
  );
};

export default Combos;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
