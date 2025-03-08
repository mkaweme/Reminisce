import React, { useState } from "react";
import { Image, ImageBackground, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { Link, useLocalSearchParams } from "expo-router";
import threePieceBackground from "../assets/images/3_Piece_Background.jpg";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

const UploadPortrait = () => {

  const { size, price, aspectRatio: aspectRatioParam } = useLocalSearchParams();
  const aspectRatio = Array.isArray(aspectRatioParam) ? parseFloat(aspectRatioParam[0]) : parseFloat(aspectRatioParam);
  const [image_1, setImage_1] = useState<string | null> (null);
  const [image_2, setImage_2] = useState<string | null> (null); 
   
  /**
   * Prompts the user to select an image from the device's library and allows them to edit it.
   * The aspect ratio of the image is set to 1:aspectRatio, where aspectRatio is the value of the aspectRatio search param.
   * If the user selects an image, the URI of the edited image is returned; otherwise, null is returned.
   */
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
      <ImageBackground source={threePieceBackground} style={styles.fullImageContainer}>
        <View>
          <View style={styles.imageContainer}>
            <Image source={image_1 ? { uri: image_1 } : { uri: "https://picsum.photos/200/300" }} style={{ width: 250, height: 250, resizeMode: "contain" }} />
            <TouchableOpacity style={styles.cameraIcon} onPress={async () => setImage_1(await pickImage())}>
              <MaterialCommunityIcons name="camera-plus-outline" size={24} color="white" />
            </TouchableOpacity>
          </View>
          
        </View>
        {
          size == "A4 X 2" 
            ? (
              <View style={styles.imageContainer}>
                <Image source={image_2 ? { uri: image_2 } : { uri: "https://picsum.photos/200/300" }} style={{ width: 300, height: 300 * aspectRatio, resizeMode: "contain" }} />
                <TouchableOpacity style={styles.cameraIcon} onPress={async () => setImage_2(await pickImage())}>
                  <MaterialCommunityIcons name="camera-plus-outline" size={24} color="white" />
                </TouchableOpacity>
              </View>
            
            ) : null
        } 
        <Link href={{ pathname: "/order", params: { price: price } }} asChild>
          <TouchableOpacity style={styles.orderButton}>
            <Text style={styles.orderButtonText}>ORDER</Text>
          </TouchableOpacity>
        </Link>
      </ImageBackground>
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
    width: 150,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 5,
    backgroundColor: "#09759a",
  },
  buttonText: {
    color: "#fff",
    fontFamily: "BebasNeue-Regular",
    fontSize: 30,
    fontWeight: "bold",
  },
  fullImageContainer: {
    height: 550,
    width: "100%",
    alignItems: "center",
  },
  imageContainer : {
    display: "flex",
    flexDirection: "column",
    marginTop: 30,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000000",
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 2.5,
    elevation: 5,
  },
  cameraIcon: {
    position: "absolute",
    borderColor: "#ffffff66",
    borderWidth: 3,
    borderRadius: 25,
    padding: 5,
    bottom: 0,
    right: 0,
  },
  orderButtonContainer: {
    display: "flex",
    flexDirection: "row",
    width: 150,
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 30,
    backgroundColor: "yellow",
  },
  orderButton : {
    width: 150,
    height: 40,
    margin: 20,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 20,
    backgroundColor: "#09759a",
  },
  orderButtonText : {
    fontSize: 20,
    fontWeight: "bold",
    color: "#ffffff",
  },
});
