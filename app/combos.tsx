// import React from "react";
// import { StyleSheet, Text, View } from "react-native";

// const SIZES = [
//   "3 Piece | 2 * A4 | 1 * A3",
//   "4 Piece | 2 * A4 | 2 * A3",
//   "4 Piece | 4 * A4",
//   "4 Piece | 4 * A4 | 2 * A3",
//   "5 Piece MOMENTS | 4 * 20CM L * 40CM W| 1 * 59CM L * 35CM W",
//   "6 Piece",
//   "7 Piece Warm | 1 * A1 | 6 * 25CM * 25CM",
// ];

// const Combos = () => {
//   return (
//     <View>
//       <Text>combos</Text>
//     </View>
//   );
// };

// export default Combos;

// const styles = StyleSheet.create({});

import React, { useState } from "react";
import { View, Image, Button, StyleSheet, ImageStyle, ViewStyle } from "react-native";
import * as ImagePicker from "expo-image-picker";

export default function ImageUploader(): JSX.Element {
  const [imageUri, setImageUri] = useState<string | null>(null);

  const pickImage = async (): Promise<void> => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      alert("Permission to access the media library is required!");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: false,
    });

    if (!result.canceled) {
      setImageUri(result.assets[0].uri);
    }
  };

  return (
    <View style={styles.container}>
      <Button title="Pick an Image" onPress={pickImage} />
      {imageUri && (
        <View style={styles.previewContainer}>
          <Image source={{ uri: imageUri }} style={styles.fullImage} />
          <View style={styles.previewWindow}>
            <Image source={{ uri: imageUri }} style={styles.previewImage} />
          </View>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create<{
  container: ViewStyle;
  fullImage: ImageStyle;
  previewContainer: ViewStyle;
  previewWindow: ViewStyle;
  previewImage: ImageStyle;
}>({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },
  fullImage: {
    width: 400,
    height: 300,
    marginBottom: 16,
  },
  previewContainer: {
    position: "relative",
  },
  previewWindow: {
    position: "absolute",
    top: 0,
    left: 100, // Moves the preview window to the middle section
    width: 200,
    height: 300,
    overflow: "hidden",
  },
  previewImage: {
    width: 400,
    height: 300,
    position: "absolute",
    left: -100, // Shifts the image to show only the middle section
  },
});
