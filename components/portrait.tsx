import React from "react";
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useDispatch } from "react-redux";
import { cartActions } from "../app/CartReducer";
import { LinearGradient } from "expo-linear-gradient";

const Portrait: React.FC<{ item: CanvasItem }> = ({ item }) => { 
    
  //Define variables for the dispatch function
  const dispatch = useDispatch();

  //Define a function that aremoves an item from the cart
  const removeItemFromCart = () => {
    const cartItem = {
      id: item.size,
      name: item.size,
      price: item.price,
      size: item.size,
      imageUrls: [item.imageUrls[0], item.imageUrls[1]],
      quantity: 1,
      totalPrice: item.price,
      type: item.type
    };
    dispatch(cartActions.removeFromCart(cartItem));
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ justifyContent: "center" }}>
      <View style={styles.section}>
        <View style={styles.imageContainer}>
          <Image 
            source={ 
              item.imageUrls[0] ? 
                { uri: item.imageUrls[0] } : 
                { uri: "https://picsum.photos/200/300" }
            } 
            style={styles.portrait} 
          />
        </View>
        {
          (item.size === "A4 X 2") && (
            <View style={styles.imageContainer}>
              <Image 
                source={
                  item.imageUrls[1] ? 
                    { uri: item.imageUrls[1] } : 
                    { uri: "https://picsum.photos/200/300" }
                } 
                style={styles.portrait} 
              />
            </View>
          )
        }          
        <View style={styles.detailsContainer}>
          <Text style={styles.canvasType}>{item.size}</Text>
          <Text style={styles.canvasType}> : </Text>
          <LinearGradient 
            colors={["#34ffc6", "#d900aa" ]} 
            start={{ x:0, y: 0 }} 
            end={{ x: 1, y: 1 }} 
            style={styles.priceContainer}   
          >
            <Text style={styles.price}>K{item.price}</Text>
          </LinearGradient>
        </View>
        <TouchableOpacity style={styles.orderButton} onPress={removeItemFromCart}>
          <Text style={styles.orderButtonText}>REMOVE FROM CART</Text>
        </TouchableOpacity>
      </View>  
    </ScrollView>
  );
};

export default Portrait;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  section : {
    justifyContent: "space-between",
    alignItems: "center",
  },
  imageContainer : {
    display: "flex",
    flexDirection: "column",
    marginTop: 20,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000000",
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 2.5,
    elevation: 5,
  },
  portrait: {
    width: 200,
    height: 300,
  },
  detailsContainer: {
    display: "flex",
    flexDirection: "row",
    marginTop: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  canvasType: {
    position: "relative",
    fontSize: 40,
    fontFamily: "BebasNeue-Regular",
    color: "#ffffff"
  },
  priceContainer: {
    fontSize: 40,
    width: 100,
    height: 50,
    fontFamily: "BebasNeue-Regular",
    color: "#ffffff",
    alignItems: "center",
    borderRadius:5,
  },
  price: {
    fontFamily: "BebasNeue-Regular",
    color: "#ffffff",
    fontSize: 40,
  },
  orderButton : {
    width: 250,
    height: 40,
    margin: 20,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 20,
    backgroundColor: "#ffffff",
  },
  orderButtonText : {
    color: "#1f1f1f",
    fontSize: 18,
    fontWeight: "500",
  },
});
