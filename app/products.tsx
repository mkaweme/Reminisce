import React from "react";
import { Link, RelativePathString } from "expo-router";
import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

const PRODUCTS: { id: number, title: string, backgroundColor: string, link: RelativePathString, image: string }[] = [
  {
    id: 1,
    title: "PORTRAITS",
    backgroundColor: "#e7d4b4",
    link: "/portraits" as RelativePathString,
    image: "https://picsum.photos/200/300",
  },
  {
    id: 2,
    title: "Splits",
    backgroundColor: "skyblue",
    link: "/splits" as RelativePathString,
    image: "https://picsum.photos/200/300",
  },
  {
    id: 3,
    title: "Combos",
    backgroundColor: "steelblue",
    link: "/combos" as RelativePathString,
    image: "https://picsum.photos/200/300",
  },
  {
    id: 4,
    title: "Hexagons",
    backgroundColor: "#cd212a",
    link: "/hexagons" as RelativePathString,
    image: "https://picsum.photos/200/300",
  },
];
const Products = () => {
  return (
    <FlatList 
      data={PRODUCTS} 
      keyExtractor={(item) => item.id.toString()} 
      renderItem={({ item }) => 
        <Item 
          link={item.link}
          title={item.title} 
          image={item.image} 
          style={styles.section} 
          backgroundColor={item.backgroundColor}
        />
      } 
    >     
    </FlatList>
  );
};

export default Products;

type ItemProps = { title: string, image: string, style : object, backgroundColor: string, link: RelativePathString };

const Item = ({ title, image, style, backgroundColor, link }: ItemProps) => (
  <View style={{ ...style, backgroundColor: backgroundColor }}>
    <Text style={styles.title}>{title}</Text>
    <Image style={styles.portrait} source={{ uri:image }} />
    <Link href={link} asChild>
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>See Products</Text>
      </TouchableOpacity>
    </Link>
  </View>
);

const styles = StyleSheet.create({
  container : {
    display: "flex",
    flexDirection: "column",
  },
  section: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  portrait: {
    width: 200,
    height: 300,
    margin: 20,
    borderColor: "#FFFFFF",
    borderWidth: 5,
  },
  title : {
    fontSize: 36,
    fontWeight: "bold",
    color: "#FFFFFF",
    margin: 40,
  },
  button: {
    margin: 30,
    width: 150,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 50,
    alignSelf: "center",
    backgroundColor: "#3d7794",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});