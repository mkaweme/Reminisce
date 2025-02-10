import React, { useState } from "react";
import { Button, Image, StyleSheet, Text, View } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { useLocalSearchParams } from "expo-router";
import logo_mini from "../assets/images/logo_mini.jpg";

const uploadPortrait = () => {

  const { size, price, aspectRatio: aspectRatioParam } = useLocalSearchParams();
  const aspectRatio = Array.isArray(aspectRatioParam) ? parseInt(aspectRatioParam[0]) : parseInt(aspectRatioParam);
  const [image, setImage] = useState<string | null> (null);

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      aspect: [1, aspectRatio],
      quality: 1,
    });

    //If an images was selected and the process wasn't cancelled
    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.button}>
        <Text style={styles.buttonText}>{size}</Text>
        <Text style={styles.buttonText}> : </Text>
        <Text style={styles.buttonText}>K{price}</Text>
      </View>
      <View style={styles.imageContainer}>
        <Image source={image ? { uri: image } : logo_mini} style={{ width: 300, height: 300 * aspectRatio }} />
      </View>
      <Button title="Select Image" onPress={pickImage} />
    </View>
  );
};

export default uploadPortrait;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-around",
  },
  button: {
    display: "flex",
    flexDirection: "row",
    margin: 20,
    width: 200,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 5,
    backgroundColor: "#09759a",
  },
  buttonText: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
  },
  imageContainer : {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000000",
    shadowOffset: { width: 5, height: 5 },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 10,
  },
});