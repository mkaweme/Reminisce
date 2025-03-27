import { Modal, ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import Cherry from "components/combos/cherry";
import Dine from "components/splits/dine";
import Fun from "components/combos/fun";
import Growth from "components/combos/growth";
import Hexagons from "app/hexagons";
import Home from "components/splits/home";
import Joy from "components/splits/joy";
import Moments from "components/combos/moments";
import Nice from "components/splits/nice";
import Sweet from "components/splits/sweet";
import Time from "components/combos/time";
import Warm from "components/combos/warm";
import { useSelector } from "react-redux";
import { RootState } from "app/store";
import EmptyCart from "assets/images/empty-cart.jpg";
import { Image } from "react-native";

export type OpenMapArgs = {
  lat: string | number;
  lng: string | number;
  label: string;
};

const Cart: React.FC = () => {

  //Define state variables
  const [showModal, setShowModal] = useState<boolean>(false);
  
  const cart = useSelector((state: RootState) => state.cart);
  console.log("Cart", cart.items);

  const componentsMap = {
    CHERRY: Cherry,
    DINE: Dine,
    FUN: Fun,
    GROWTH: Growth,
    HEXAGONS: Hexagons,
    HOME: Home,
    JOY: Joy,
    MOMENTS: Moments,
    NICE: Nice,
    SWEET: Sweet,
    TIME: Time,
    WARM: Warm,
  };

  useEffect(() => {
    if (cart.items.length === 0) {
      setShowModal(true);
    }
  });
  return (
    <ScrollView style={styles.container} contentContainerStyle={{ alignItems: "center" }}>
      <Modal visible={showModal} onRequestClose={() => setShowModal(false)}>
        <View style={styles.cartEmptyContainer}>
          <Image source={EmptyCart} width={512} height={512} style={styles.cartEmptyImage}/>
          <Text style={styles.cartEmptyText}>Your cart is empty</Text>
        </View>
      </Modal>
      <Text style={styles.canvasType}>Your order</Text>
      <ScrollView>
        {cart.items.map((item, index) => {
          const Component = typeof item.name === "string" && item.name in componentsMap 
            ? componentsMap[item.name as keyof typeof componentsMap] 
            : null;
          return Component ? <Component key={index} /> : null;
        })}
      </ScrollView>
    </ScrollView>
  );
};

export default Cart;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#00000077",
  },
  canvasType: {
    fontSize: 40,
    fontFamily: "BebasNeue-Regular",
    marginTop: 20,
    color: "#ffffff",
  },
  cartEmptyContainer: {
    height: "100%",
    width: "100%",
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
  },
  cartEmptyImage: {
    height: 350,
    width: 350,
    resizeMode: "contain",
  },
  cartEmptyText: {
    fontSize: 30,
    marginTop: 20,
    color: "#00000088",
  },
});