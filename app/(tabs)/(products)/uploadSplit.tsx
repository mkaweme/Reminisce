import React from "react";
import { ScrollView, StyleSheet } from "react-native";
import { useLocalSearchParams } from "expo-router";
import Dine from "../../../components/splits/dine";
import Home from "../../../components/splits/home";
import Joy from "../../../components/splits/joy";
import Nice from "../../../components/splits/nice";
import Sweet from "../../../components/splits/sweet";
import { LinearGradient } from "expo-linear-gradient";

const UploadSplit: React.FC = () => {

  //Destructure the name from params
  const { name } = useLocalSearchParams();
  // Ensure type is a string
  const nameString = Array.isArray(name) ? name[0] : name;

  const componentsMap = {
    DINE: Dine,
    HOME: Home,
    JOY: Joy,
    NICE: Nice,
    SWEET: Sweet,
  };
 
  const Component = 
    typeof nameString === "string" && nameString in componentsMap 
      ? componentsMap[name as keyof typeof componentsMap] 
      : Dine;

  return (
    <LinearGradient 
      colors={["#053046", "#41758f"]} 
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

export default UploadSplit;

const styles = StyleSheet.create({
  gradientContainer: {
    flex: 1,
    height: "100%"
  },
  container: {
    flex: 1,
  },
});
