import React from "react";
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useDispatch } from "react-redux";
import { cartActions } from "../app/CartReducer";
import Details from "./details";

type ComponentProps = {
  item: CanvasItem;
  modalOpen?: boolean;
};

const Portrait: React.FC<ComponentProps> = ({ item, modalOpen }) => { 
    
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
        <Details price={item.price} size={item.size}/>
        { (!modalOpen) &&
          <TouchableOpacity style={styles.orderButton} onPress={removeItemFromCart}>
            <Text style={styles.orderButtonText}>REMOVE FROM CART</Text>
          </TouchableOpacity>
        }
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
    shadowOffset: { width: 5, height: 5 },
    shadowOpacity: 0.25,
    shadowRadius: 2.5,
    elevation: 5,
  },
  portrait: {
    width: 200,
    height: 300,
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
