import React, { useState } from "react";
import { View, Image, StyleSheet, TouchableOpacity, Text } from "react-native";
import * as ImagePicker from "expo-image-picker";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

const Fun = () => {

  //Define state variables
  const [image_1, setImage_1] = useState<string | null>(null);
  const [image_2, setImage_2] = useState<string | null>(null);
  const [image_3, setImage_3] = useState<string | null>(null);
  const [image_4, setImage_4] = useState<string | null>(null);
  const [image_5, setImage_5] = useState<string | null>(null);
  const [image_6, setImage_6] = useState<string | null>(null);

  //Define a function for selecting an image from the device
  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      quality: 1,
    });
    
    //If an images was selected and the process wasn't cancelled
    if (!result.canceled) {
      return result.assets[0].uri;
    } else return null;
  };

  return (
    <View style={styles.container}>
      <Text style={styles.comboType}>6 PIECE FUN</Text>
      <View style={styles.imagesContainer}>
        <View style={styles.columnImagesContainer}>
          <View style={styles.imageContainer}>
            <Image source={image_1 ? { uri: image_1 } : { uri : "https://picsum.photos/200/300" }} style={styles.image_1} />
            <TouchableOpacity style={styles.cameraIcon} onPress={async () => setImage_1(await pickImage())}>
              <MaterialCommunityIcons name="camera-plus-outline" size={12} color="white" />
            </TouchableOpacity>
          </View>
          <View style={styles.imageContainer}>
            <Image source={image_2 ? { uri: image_2 } : { uri : "https://picsum.photos/200/300" }} style={styles.image_1} />
            <TouchableOpacity style={styles.cameraIcon} onPress={async () => setImage_2(await pickImage())}>
              <MaterialCommunityIcons name="camera-plus-outline" size={12} color="white" />
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.columnImagesContainer}>
          <View style={styles.imageContainer}>
            <Image source={image_3 ? { uri: image_3 } : { uri : "https://picsum.photos/200/300" }} style={styles.image_2} />
            <TouchableOpacity style={styles.cameraIcon} onPress={async () => setImage_3(await pickImage())}>
              <MaterialCommunityIcons name="camera-plus-outline" size={18} color="white" />
            </TouchableOpacity>
          </View>
          <View style={styles.imageContainer}>
            <Image source={image_4 ? { uri: image_4 } : { uri : "https://picsum.photos/200/300" }} style={styles.image_2} />
            <TouchableOpacity style={styles.cameraIcon} onPress={async () => setImage_4(await pickImage())}>
              <MaterialCommunityIcons name="camera-plus-outline" size={18} color="white" />
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.columnImagesContainer}>
          <View style={styles.imageContainer}>
            <Image source={image_5 ? { uri: image_5 } : { uri : "https://picsum.photos/200/300" }} style={styles.image_1} />
            <TouchableOpacity style={styles.cameraIcon} onPress={async () => setImage_5(await pickImage())}>
              <MaterialCommunityIcons name="camera-plus-outline" size={12} color="white" />
            </TouchableOpacity>
          </View>
          <View style={styles.imageContainer}>
            <Image source={image_6 ? { uri: image_6 } : { uri : "https://picsum.photos/200/300" }} style={styles.image_1} />
            <TouchableOpacity style={styles.cameraIcon} onPress={async () => setImage_6(await pickImage())}>
              <MaterialCommunityIcons name="camera-plus-outline" size={12} color="white" />
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <View style={styles.details}>
        <Text style={styles.splitCanvasDimensions}>2 X A3 | 4 X A4</Text>
        <View style={styles.priceTab}>
          <Text style={styles.priceTabText}>K750</Text>
        </View>
      </View>
      <TouchableOpacity style={styles.orderButton}>
        <Text style={styles.orderButtonText}>ORDER</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Fun;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
    backgroundColor: "#e0b0ff",
  },
  comboType: {
    fontSize: 36,
    fontWeight: "bold",
    fontFamily: "BebasNeue-Regular",
    marginTop: 30,
  },
  imagesContainer: {
    display: "flex",
    flexDirection: "row",
    width: "100%",
    columnGap: 10,
    marginTop: 30,
    height: 260,
    justifyContent: "center",
  },
  columnImagesContainer: {
    display: "flex",
    flexDirection: "column",
    rowGap: 15,
    justifyContent: "space-around",
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
  },
  image_1: {
    width: 80, 
    height: 100, 
    resizeMode: "stretch",
    shadowColor: "#000000",
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 2.5,
    elevation: 5,
  },
  image_2: {
    width: 150, 
    height: 110, 
    resizeMode: "stretch",
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
  details: {
    width: 275,
    marginTop: 15,
    backgroundColor: "#ffffff66",
    alignContent: "center",
    alignItems: "center",
  },
  splitCanvasDimensions: {
    fontSize: 30,
    fontWeight: "bold",
    fontFamily: "BebasNeue-Regular",
  },
  priceTab: {
    display: "flex",
    flexDirection: "row",
    marginBottom: 10,
    width: 100,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 5,
    backgroundColor: "#09759a",
  },
  priceTabText: {
    color: "#fff",
    fontSize: 30,
    fontWeight: "bold",
    fontFamily: "BebasNeue-Regular",
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
    fontSize: 24,
    fontWeight: "bold",
    color: "#ffffff",
  },
});
