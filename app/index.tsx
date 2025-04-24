import React from "react";
import { ImageBackground, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Image } from "react-native";
import logo from "../assets/images/logo_2_transparent.png";
import { LinearGradient } from "expo-linear-gradient";
import { Link } from "expo-router";
import logoBackground from "../assets/images/logo_background.png";

const Index = () => {
  
  return (
    <LinearGradient 
      colors={["#34ffc688", "#62004d"]} 
      start={{ x:0, y: 0 }} 
      end={{ x: 1, y: 1 }}  
      style={styles.container}
    >
      <View>
        <View style={styles.banner}>
          <ImageBackground source={logoBackground} style={styles.logoContainer} >
            <Image source={logo} width={684} height={766} style={styles.logo}/>
          </ImageBackground>
          <Text style={styles.title}>WELCOME TO REMINISCE CANVAS.</Text>
        </View>
        <Text style={styles.text}>
          At Reminisce Canvas we do much more than just print photos on canvas, we work 
          with our customers to create personalized home decor art that they will love 
          and appreciate!
        </Text>
        <Link href="/(tabs)/(products)" asChild>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>See Products</Text>
          </TouchableOpacity>
        </Link>
      </View>
    </LinearGradient>
  );
};

export default Index;

const styles = StyleSheet.create({
  container: {
    height: "100%",
    justifyContent: "center",
  },
  banner: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-around",

  },
  logoContainer: {
    width: 162,
    height: 162,
    marginVertical: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  logo: {
    width: 100,
    height: 125,
  },
  divider: {
    width: "50%",
    height: 3,
    backgroundColor: "#3d7794",
  },
  title: {
    fontSize: 36,
    fontFamily: "Galada-Regular",
    color: "#ffffff",
    width: "60%",
    textAlign: "center",
  },
  text: {
    margin: 16,
    fontSize: 16,
    fontFamily: "Inter-Regular",
    color: "#ffffff",
    textAlign: "center",
  },
  button: {
    marginTop: 30,
    width: 200,
    height: 64,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 50,
    alignSelf: "center",
    backgroundColor: "#ffffff",
  },
  buttonText: {
    color: "#1f1f1f",
    fontSize: 18,
    fontWeight: "500",
  },
});