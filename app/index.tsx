import { useEffect, useState } from "react";
import { Image, Text, View } from "react-native";

export default function Index() {
  useEffect(() => {
    console.log("En pantalla");
    getPokemons();
  }, []);

  const [pokemon, setPokemon] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const getPokemons = async () => {
    const url: string =
      "https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0";
    const response = await fetch(url, {
      method: "GET",
    });
    const data = await response.json();
    const firstPokemonUrl = data.results[0].url;
    const pokemonResponse = await fetch(firstPokemonUrl);
    const pokemonData = await pokemonResponse.json();
    setPokemon(pokemonData);
    setLoading(false);
    console.log(pokemonData);
  };

  return (
    <View>
      {pokemon && (
        <>
          <Image
            source={{ uri: pokemon.sprites.front_default }}
            style={{ width: 150, height: 150 }}
          />
          <Text>{pokemon?.name?.toUpperCase()}</Text>
        </>
      )}
    </View>
  );
}
