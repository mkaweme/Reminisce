import { StyleSheet, Text, View } from "react-native";
import React from "react";

const products = () => {
  return (
    <View>
      <View>
        <Text>Portraits</Text>
        <View></View>
        <Text>A1</Text>
        <Text>A2</Text>
        <Text>A3</Text>
        <Text>40 * 40</Text>
        <Text>50 * 50</Text>
        <Text>30 * 30</Text>
        <Text>A4 * 2</Text>
      </View>
      <View>
        <Text>Splits</Text>
        <View></View>
        <Text>3 Piece</Text>
        <Text>4 Piece Nice | 90CM * 120CM</Text>
        <Text>4 Piece Joy | 70CM * 120CM</Text>
        <Text>5 Piece Sweet | 90CM * 150CM</Text>
        <Text>6 Piece Home | 3 * 50CM L * 25CM W | 3 * 25CM * 25CM</Text>
      </View>
      <View>
        <Text>Combos</Text>
        <View></View>
        <Text>3 Piece | 2 * A4 | 1 * A3</Text>
        <Text>4 Piece | 2 * A4 | 2 * A3</Text>
        <Text>4 Piece | 4 * A4</Text>
        <Text>4 Piece | 4 * A4 | 2 * A3</Text>
        <Text>5 Piece MOMENTS | 4 * 20CM L * 40CM W| 1 * 59CM L * 35CM W</Text>
        <Text>6 Piece</Text>
        <Text>7 Piece Warm | 1 * A1 | 6 * 25CM * 25CM</Text>
      </View>
    </View>
  );
};

export default products;

const styles = StyleSheet.create({});