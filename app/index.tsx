import { Button } from "@react-navigation/elements";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { Image, StyleSheet, Text, TextInput, View } from "react-native";

export default function Index() {
  const router = useRouter();
  useEffect(() => {
    console.log("En pantalla");
    getPokemons();
  }, []);

  const [pokemon, setPokemon] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  // Buscador de pokemon
  const [pokemonId, setPokemonId] = useState("1");

  const getPokemons = async () => {
    const url = `https://pokeapi.co/api/v2/pokemon/${pokemonId}`;
    // Peticion a la api
    const response = await fetch(url, {
      method: "GET",
    });
    // Convertir a json
    const data = await response.json();
    // Se guarda la informcaion
    setPokemon(data);
    setLoading(false);
  };

  return (
    <View style={{ alignItems: "center" }}>
      {pokemon && (
        <>
          <View style={styles.contenedorImagen}>
            <Image
              source={{ uri: pokemon.sprites.front_default }}
              style={{ width: 150, height: 150 }}
            />
            <Text style={styles.txtContImg}>{pokemon?.name.toUpperCase()}</Text>
          </View>
          <TextInput
            style={styles.textInput}
            placeholder="ID"
            onChangeText={(texto) => setPokemonId(texto)}
            value={pokemonId}
          ></TextInput>
          <Button onPress={getPokemons}
            style={{ marginBottom: 20 }} >
            Buscar pokemon
          </Button>
          <Button onPress={() => router.push("/Pokemones")}>
            Ir a Pokemones
          </Button>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  contenedorImagen: {
    borderWidth: 1,
    borderColor: "black",
    alignItems: "center",
    marginTop: 20,
  },
  txtContImg: {
    alignItems: "center",
    marginBottom: 5,
  },
  textInput: {
    textAlign: "center",
    margin: 15,
    borderWidth: 1.5,
    borderColor: "#000000",
    borderRadius: 7,
    width: 60,
  },
});
