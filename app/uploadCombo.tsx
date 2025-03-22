import React from "react";
import {  
  ScrollView, 
  StyleSheet, 
} from "react-native";
import { useLocalSearchParams } from "expo-router";
import Cherry from "./components/combos/cherry";
import Fun from "./components/combos/fun";
import Growth from "./components/combos/growth";
import Moments from "./components/combos/moments";
import Time from "./components/combos/time";
import Warm from "./components/combos/warm";
import { LinearGradient } from "expo-linear-gradient";

const UploadCombo: React.FC = () => {

  //Destructure the name from paras
  const { name } = useLocalSearchParams();
  
  // Ensure type is a string
  const nameString = Array.isArray(name) ? name[0] : name;

  const componentsMap = {
    CHERRY: Cherry,
    FUN: Fun,
    GROWTH: Growth,
    MOMENTS: Moments,
    TIME: Time,
    WARM: Warm,
  };
 
  const Component = 
    typeof nameString === "string" && nameString in componentsMap 
      ? componentsMap[name as keyof typeof componentsMap] 
      : Cherry;

  return (
    <LinearGradient 
      colors={["#34ffc688", "#62004d"]} 
      start={{ x:0, y: 0 }} 
      end={{ x: 1, y: 1 }} 
      style={styles.gradientContainer}   
    >
      <ScrollView style={styles.container}>
        <Component />
      </ScrollView>
    </LinearGradient>
  );
};

export default UploadCombo;

const styles = StyleSheet.create({
  gradientContainer: {
    flex: 1,
    height: "100%"
  },
  container: {
    flex: 1,
  },
});
