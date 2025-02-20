import React, { useState } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import * as ImagePicker from "expo-image-picker";

const Sweet = () => {

  const [image, setImage] = useState<string | null> (null);

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
      <Text style={styles.splitCanvasType}>5 PIECE SWEET</Text>
      <View style={styles.splitContainer}>
        <View style={styles.previewContainer_1}> 
          <View style={styles.previewWindow_1}>
            <Image source={image ? { uri: image } : { uri: "https://picsum.photos/200/300" }} style={styles.image_1} />
          </View>
        </View>
        <View style={styles.previewContainer_2}>
          <View style={styles.previewWindow_2}>
            <Image source={image ? { uri: image } : { uri: "https://picsum.photos/200/300" }} style={styles.image_2} />
          </View>
        </View>
        <View style={styles.previewContainer_3}>
          <View style={styles.previewWindow_3}>
            <Image source={ image ? { uri: image } : { uri: "https://picsum.photos/200/300" }} style={styles.image_3} />
          </View>
        </View>
        <View style={styles.previewContainer_2}>
          <View style={styles.previewWindow_2}>
            <Image source={ image ? { uri: image } : { uri: "https://picsum.photos/200/300" }} style={styles.image_4} />
          </View>
        </View>
        <View style={styles.previewContainer_1}>
          <View style={styles.previewWindow_1}>
            <Image source={ image ? { uri: image } : { uri: "https://picsum.photos/200/300" }} style={styles.image_5} />
          </View>
        </View>
        <TouchableOpacity style={styles.cameraIcon} onPress={async () => setImage(await pickImage())}>
          <MaterialCommunityIcons name="camera-plus-outline" size={24} color="white" />
        </TouchableOpacity>
      </View>
      <View style={styles.details}>
        <Text style={styles.splitCanvasDimensions}>90CM X 150CM</Text>
        <View style={styles.priceTab}>
          <Text style={styles.priceTabText}>K850</Text>
        </View>
      </View>
      <TouchableOpacity style={styles.orderButton}>
        <Text style={styles.orderButtonText}>ORDER</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Sweet;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#edf9eb",
  },
  splitCanvasType: {
    position: "relative",
    fontSize: 40,
    fontWeight: "bold",
    fontFamily: "BebasNeue-Regular",
    marginTop: 30,
  },
  header: {
    fontSize: 30,
    fontWeight: "bold",
    marginVertical: 30,
  },
  fullImageContainer: {
    height: 500,
    width: "90%",
    alignItems: "center",
    justifyContent: "space-between",
  },
  splitContainer: {
    flexDirection: "row",
    width: 310,
    height: 225,
    alignContent: "center",
    justifyContent: "space-between",
  },
  previewContainer_1: {
    position: "relative",
    top: 25,
    height: 140,
    shadowColor: "#000",
    shadowOffset: { 
      width: 5, 
      height: 5 
    },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 5,
  },
  previewContainer_2: {
    position: "relative",
    top: 10,
    height: 160,
    shadowColor: "#000",
    shadowOffset: { 
      width: 5, 
      height: 5 
    },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 5,
  },
  previewContainer_3: {
    position: "relative",
    height: 180,
    shadowColor: "#000",
    shadowOffset: { 
      width: 5, 
      height: 5 
    },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 5,
  },
  previewWindow_1: {
    width: 60,
    height: 130,
    overflow: "hidden",
  },
  previewWindow_2: {
    width: 60,
    height: 160,
    overflow: "hidden",
  },
  previewWindow_3: {
    width: 60,
    height: 180,
    overflow: "hidden",
  },
  image_1: {
    width: 300,
    height: 180,
    top: -25,
  },
  image_2: {
    width: 300,
    height: 180,
    position: "absolute",
    left: -60,
    top: -10,
  },
  image_3: {
    width: 300,
    height: 180,
    position: "absolute",
    left: -120,
  },
  image_4: {
    width: 300,
    height: 180,
    position: "absolute",
    left: -180,
    top: -10,  
  },
  image_5: {
    width: 300,
    height: 180,
    position: "absolute",
    left: -240,
    top: -25,  
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
    backgroundColor: "#ffffff",
    width: 150,
    height: 40,
    margin: 20,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 20,
  },
  orderButtonText : {
    color: "#09759a",
    fontSize: 24,
    fontWeight: "bold",
  },

});