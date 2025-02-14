import React, { useState } from "react";
import { Button, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { useLocalSearchParams } from "expo-router";
import logo_mini from "../assets/images/logo_mini.jpg";

const UploadPortrait = () => {

  const { size, price, aspectRatio: aspectRatioParam } = useLocalSearchParams();
  const aspectRatio = Array.isArray(aspectRatioParam) ? parseFloat(aspectRatioParam[0]) : parseFloat(aspectRatioParam);
  const [image, setImage] = useState<string | null> (null);
  const [image2, setImage2] = useState<string | null> (null);

  //Create a function to selecting an image from the device
  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      aspect: [1, aspectRatio],
      quality: 1,
    });

    //If an images was selected and the process wasn't cancelled
    if (!result.canceled) {
      return result.assets[0].uri;
    } else return null;
  };
  
  return (
    <ScrollView style={styles.container} contentContainerStyle={{ alignItems: "center" }}>
      <View style={styles.button}>
        <Text style={styles.buttonText}>{size}</Text>
        <Text style={styles.buttonText}> : </Text>
        <Text style={styles.buttonText}>K{price}</Text>
      </View>
      <View>
        <View>
          <View style={styles.imageContainer}>
            <Image source={image ? { uri: image } : logo_mini} style={{ width: 300, height: 300 * aspectRatio, resizeMode: "contain" }} />
          </View>
          <Button title="Select Image" onPress={async () => setImage(await pickImage())} />
        </View>
        {
          size == "A4 X 2" 
            ? (
              <View>
                <View style={styles.imageContainer}>
                  <Image source={image2 ? { uri: image2 } : logo_mini} style={{ width: 300, height: 300 * aspectRatio, resizeMode: "contain" }} />
                </View>
                <TouchableOpacity style={styles.button2} onPress={async () => setImage2(await pickImage())}>
                  <Text style={{ color: "#fff" }}>Select Image</Text>
                </TouchableOpacity>
              </View>
            ) : null
        } 
      </View>
    </ScrollView>
  );
};

export default UploadPortrait;

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 2.5,
    elevation: 5,
    margin: 20
  },
  button2: {
    display: "flex",
    alignItems: "center",
    color: "white",
    marginBottom: 20,
    backgroundColor: "#5c799a", 
    padding: 10, 
  }
});