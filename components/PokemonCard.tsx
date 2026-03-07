import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";

interface PokemonCardProps {
  name: string;
  url: string;
}

const PokemonCard = ({ name, url }: PokemonCardProps) => {
  // Corta texto cada vez que haya diagonal
  const partes = url.split("/");
  // Borra espacio en blanco
  const id = partes.filter(Boolean).pop();

  const imageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;

  return (
    <View style={styles.card}>
      <Image source={{ uri: imageUrl }} style={styles.image} />
      <Text style={styles.name}>{name.toUpperCase()}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f8f8f8",
    borderRadius: 12,
    padding: 10,
    marginBottom: 12,
    width: 330,
  },
  image: {
    width: 100,
    height: 100,
    marginLeft: 10,
  },
  name: {
    fontSize: 20,
    fontWeight: "600",
    marginLeft: 15,
    color: "#333",
    textAlign: "center",
  },
});

export default PokemonCard;
