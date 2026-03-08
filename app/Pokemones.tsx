import PokemonCard from "@/components/PokemonCard";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";

interface Pokemon {
  name: string;
  url: string;
}

export default function Pokemones() {
  const router = useRouter();
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);

  // Trae los polemones
  useEffect(() => {
    fetchPokemons();
  }, []);

  const fetchPokemons = async () => {
    //Peticion get
    const response = await fetch("https://pokeapi.co/api/v2/pokemon?limit=60");
    //Convierte a json lo que nos da la url
    const data = await response.json();
    setPokemons(data.results);
  };

  return (
    <View style={styles.container}>
      <Pressable onPress={() => router.push("/")}>Ir a Pokemones</Pressable>
      <Text style={styles.title}>Pokédex</Text>

      <FlatList
        data={pokemons}
        // Iden identificar unico
        keyExtractor={(item) => item.name}
        //Estilo al contenido
        contentContainerStyle={styles.list}
        renderItem={({ item }) => (
          <Pressable>
            <PokemonCard name={item.name} url={item.url} />
          </Pressable>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 20,
    color: "#ff4444",
  },
  list: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
});
