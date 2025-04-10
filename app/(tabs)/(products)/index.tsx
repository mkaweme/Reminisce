import React from "react";
import { Link } from "expo-router";
import { 
  Image, 
  ScrollView, 
  StyleSheet, 
  Text, 
  TouchableOpacity, 
  View 
} from "react-native";
import { Divider } from "@rneui/base";
import HexagonImage from "../../../components/hexagonImage";
import { LinearGradient } from "expo-linear-gradient";
import MaskedView from "@react-native-masked-view/masked-view";

const Products = () => {

  return (
    <View style={styles.container}>
      <LinearGradient 
        colors={["#34ffc688", "#62004d"]} 
        start={{ x:0, y: 0 }} 
        end={{ x: 1, y: 1 }}    
      >
        <View style={styles.customHeader}>
          <Text style={styles.headerText}>Products</Text>
        </View>
        <ScrollView contentContainerStyle={{ alignItems: "center" }}>
          <View style={styles.section}>
            <MaskedView
              maskElement={(
                <View
                  style={[
                    StyleSheet.absoluteFill, 
                    { borderWidth : 3, borderRadius: 10 }]}
                />
              )}
              style={[StyleSheet.absoluteFill]}
            >
              <LinearGradient
                colors={["#d900aa", "#34ffc6"]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={[StyleSheet.absoluteFill]}
              />
            </MaskedView>
            <Text style={styles.canvasType}>PORTRAITS</Text>
            <Image style={styles.portrait} source={{ uri: "https://picsum.photos/200/300" }} />
            <Link href="/portraits" asChild>
              <TouchableOpacity style={styles.orderButton}>
                <Text style={styles.orderButtonText}>SELECT</Text>
              </TouchableOpacity>
            </Link>
          </View>  
          <Divider />
          <View style={styles.section}>
            <MaskedView
              maskElement={(
                <View
                  style={[
                    StyleSheet.absoluteFill, 
                    { borderWidth : 3, borderRadius: 10 }]}
                />
              )}
              style={[StyleSheet.absoluteFill]}
            >
              <LinearGradient
                colors={["#d900aa", "#34ffc6"]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={[StyleSheet.absoluteFill]}
              />
            </MaskedView>
            <Text style={styles.canvasType}>SPLITS</Text>
            <View style={styles.splitContainer}>
              <View style={styles.splitPreviewContainer_1}> 
                <View style={styles.splitPreviewWindow}>
                  <Image 
                    source={{ uri: "https://picsum.photos/200/300" }} 
                    style={styles.splitImage_1} 
                  />
                </View>
              </View>
              <View style={styles.splitPreviewContainer_2}>
                <View style={styles.splitPreviewWindow}>
                  <Image
                    source={{ uri: "https://picsum.photos/200/300" }} 
                    style={styles.SplitImage_2} 
                  />
                </View>
              </View>
              <View style={styles.splitPreviewContainer_1}>
                <View style={styles.splitPreviewWindow}>
                  <Image 
                    source={{ uri: "https://picsum.photos/200/300" }} 
                    style={styles.splitImage_3} 
                  />
                </View>
              </View>
              <View style={styles.splitPreviewContainer_2}>
                <View style={styles.splitPreviewWindow}>
                  <Image 
                    source={{ uri: "https://picsum.photos/200/300" }}
                    style={styles.splitImage_4} 
                  />
                </View>
              </View>
            </View>
            <Link href="/splits" asChild>
              <TouchableOpacity style={styles.orderButton}>
                <Text style={styles.orderButtonText}>SELECT</Text>
              </TouchableOpacity>
            </Link>
          </View>  
          <Divider />
          <View style={styles.section}>
            <MaskedView
              maskElement={(
                <View
                  style={[
                    StyleSheet.absoluteFill, 
                    { borderWidth : 3, borderRadius: 10 }]}
                />
              )}
              style={[StyleSheet.absoluteFill]}
            >
              <LinearGradient
                colors={["#d900aa", "#34ffc6"]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={[StyleSheet.absoluteFill]}
              />
            </MaskedView>
            <Text style={styles.canvasType}>COMBOS</Text>
            <View style={styles.comboImagesContainer}>
              <View style={styles.comboColumnImagesContainer}>
                <View style={styles.comboImageContainer}>
                  <Image 
                    source={{ uri : "https://picsum.photos/200/300" }} 
                    style={styles.comboImage_1} 
                  />
                </View>
                <View style={styles.comboImageContainer}>
                  <Image 
                    source={{ uri : "https://picsum.photos/200/300" }} 
                    style={styles.comboImage_1} 
                  />
                </View>
              </View>
              <View style={styles.comboColumnImagesContainer}>
                <View style={styles.comboImageContainer}>
                  <Image 
                    source={{ uri : "https://picsum.photos/200/300" }} 
                    style={styles.comboImage_2} resizeMode="cover"
                  />
                </View>
                <View style={styles.comboImageContainer}>
                  <Image 
                    source={{ uri : "https://picsum.photos/200/300" }} 
                    style={styles.comboImage_2} resizeMode="cover"
                  />
                </View>
              </View>
              <View style={styles.comboColumnImagesContainer}>
                <View style={styles.comboImageContainer}>
                  <Image 
                    source={{ uri : "https://picsum.photos/200/300" }} 
                    style={styles.comboImage_1} 
                  />
                </View>
                <View style={styles.comboImageContainer}>
                  <Image 
                    source={{ uri : "https://picsum.photos/200/300" }} 
                    style={styles.comboImage_1} 
                  />
                </View>
              </View>
            </View>
            <Link href="/combos" asChild>
              <TouchableOpacity style={styles.orderButton}>
                <Text style={styles.orderButtonText}>SELECT</Text>
              </TouchableOpacity>
            </Link>
          </View>  
          <Divider />
          <View style={styles.section}>
            <MaskedView
              maskElement={(
                <View
                  style={[
                    StyleSheet.absoluteFill, 
                    { borderWidth : 3, borderRadius: 10 }]}
                />
              )}
              style={[StyleSheet.absoluteFill]}
            >
              <LinearGradient
                colors={["#d900aa", "#34ffc6"]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={[StyleSheet.absoluteFill]}
              />
            </MaskedView>
            <Text style={styles.canvasType}>HEXAGONS</Text>
            <View style={styles.hexagonImagesContainer}>
              <View style={styles.hexagonImageContainer}>
                <HexagonImage source={{ uri : "https://picsum.photos/200/300" }} size={150} />
              </View>
              <View style={styles.hexagonHorizonalContainer}>
                <View style={styles.hexagonImageContainer}>
                  <HexagonImage source={{ uri : "https://picsum.photos/200/300" }} size={150} />
                </View>
                <View style={styles.hexagonImageContainer}>
                  <HexagonImage source={{ uri : "https://picsum.photos/200/300" }} size={150} />
                </View>
              </View>
            </View>
            <Link href="/hexagons" asChild>
              <TouchableOpacity style={styles.orderButton}>
                <Text style={styles.orderButtonText}>SELECT</Text>
              </TouchableOpacity>
            </Link>
          </View>    
        </ScrollView>
      </LinearGradient>    
    </View>
  );
};

export default Products;

const styles = StyleSheet.create({
  container : {
    flex: 1
  },
  gradientContainer: {
    alignItems: "center",
    paddingTop: 15,
    paddingBottom: 45,
  },
  customHeader: {
    height: 70, 
    backgroundColor: "#fff",
    justifyContent: "flex-end",
    alignItems: "center",
    elevation: 4,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2 },
  },
  headerText: {
    fontSize: 18,
    fontWeight: "semibold",
    marginBottom: 5
  },
  section : {
    width: "90%",
    height: 490,
    padding: 3,
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "transparent",
    marginVertical: 15,
  },
  canvasType: {
    position: "relative",
    fontSize: 40,
    fontFamily: "BebasNeue-Regular",
    marginTop: 20,
    color: "#ffffff"
  },
  portrait: {
    width: 200,
    height: 300,
    margin: 20,
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
    color: "#1f1f1f",
    fontSize: 18,
    fontWeight: "500",
  },
  splitContainer: {
    flexDirection: "row",
    width: 305,
    height: 250,
    marginTop: 15,
    justifyContent: "space-between",
    shadowColor: "#000",
    shadowOffset: { 
      width: 10, 
      height: 10 
    },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 5,
  },
  splitPreviewContainer_1: {
    top: 35,
    width: 75,
    height: 205,
    backgroundColor: "#000000",
    shadowColor: "#000",
    shadowOffset: { 
      width: 20, 
      height: 20 
    },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 5,
  },
  splitPreviewContainer_2: {
    width: 75,
    height: 205,
    backgroundColor: "#000000",
    shadowColor: "#000",
    shadowOffset: { 
      width: 10, 
      height: 10 
    },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 5,
  },
  splitPreviewWindow: {
    width: 75,
    height: 210,
    overflow: "hidden",
  },
  splitImage_1: {
    width: 300,
    height: 240,
    top: -35,
  },
  SplitImage_2: {
    position: "absolute",
    width: 300,
    height: 240,
    left: -75,
  },
  splitImage_3: {
    position: "absolute",
    width: 300,
    height: 240,
    left: -150,
    top: -35,
    
  },
  splitImage_4: {
    position: "absolute",
    width: 300,
    height: 240,
    left: -225,
  },
  comboImagesContainer: {
    display: "flex",
    flexDirection: "row",
    width: "100%",
    columnGap: 5,
    marginTop: 30,
    height: 260,
    justifyContent: "center",
  },
  comboColumnImagesContainer: {
    display: "flex",
    flexDirection: "column",
    rowGap: 15,
    justifyContent: "space-around",
  },
  comboImageContainer : {
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
  comboImage_1: {
    width: 80, 
    height: 110, 
    resizeMode: "stretch",
    shadowColor: "#000000",
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 2.5,
    elevation: 5,
  },
  comboImage_2: {
    width: 150, 
    height: 110, 
    resizeMode: "stretch",
    shadowColor: "#000000",
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 2.5,
    elevation: 5,
  },
  hexagonImagesContainer: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
    alignItems: "center",
    justifyContent: "space-between",
  },
  hexagonImageContainer : {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  hexagonHorizonalContainer: {
    display: "flex",
    flexDirection: "row",
    top: -40,
  },
});