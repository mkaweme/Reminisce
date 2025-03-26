import { Modal, ScrollView, StyleSheet, Text } from "react-native";
import React, { useState } from "react";
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
  
  // const Component = 
  //     typeof nameString === "string" && nameString in componentsMap 
  //       ? componentsMap[name as keyof typeof componentsMap] 
  //       : null;

  return (
    <ScrollView>
      <Modal visible={showModal} onRequestClose={() => setShowModal(false)}>

      </Modal>
      <Text>Cart</Text>
      <ScrollView>
        {cart.items.map((item, index) => {
          const Component = componentsMap[item.name as keyof typeof componentsMap];
          return <Component key={index} />;
        })}
      </ScrollView>
    </ScrollView>
  );
};

export default Cart;

const styles = StyleSheet.create({});