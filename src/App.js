import React, { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [pokemonFr, setPokemonFr] = useState([]);
  const [pokemonEn, setPokemonEn] = useState([]);
  const [affichage, setAffichage] = useState(false);
  const [langue, setLangue] = useState("Fr");
  const [searchValue, setSearchValue] = useState("");

  const languePokemonFr = async () => {
    await axios
      .get("http://localhost:4000/pokemonFr")
      .then(function (response) {
        console.log(response.data);
        setPokemonFr(response.data);
        setAffichage(true);
      });
  };

  const languePokemonEn = async () => {
    await axios
      .get("http://localhost:4000/pokemonEn")
      .then(function (response) {
        setPokemonEn(response.data);
        setAffichage(true);
      });
  };

  const handleClick = (e) => {
    const langue = e.target.value;
    setLangue(langue);

    if (langue === "Fr") {
      languePokemonFr();
    } else if (langue === "En") {
      languePokemonEn();
    }
  };

  const handleDelete = (id) => {
    console.log(id);
    const confirmed = window.confirm(
      "Are you sure you want to delete this pokemon?"
    );
    if (confirmed) {
      const url = `http://localhost:4000/pokemon/${id}`;
      fetch(url, { method: "DELETE" })
        .then((response) => response.json())
        .then((response) => {
          console.log(response);
          if (langue === "Fr") {
            const updatedPokemons = pokemonFr.filter(
              (pokemon) => pokemon.id !== id
            );
            setPokemonFr(updatedPokemons);
          } else if (langue === "En") {
            const updatedPokemons = pokemonEn.filter(
              (pokemon) => pokemon.id !== id
            );
            setPokemonEn(updatedPokemons);
          }
        })
        .catch((error) => console.log(error));
    }
  };

  // Use effect mis en commentaire car il provoque une boucle infinie que je n'ai pas réussi à résoudre
  // useEffect(() => {

  //   languePokemonFr();
  // }, [pokemonFr])

  return (
    <>
      <div>
        <button value="Fr" onClick={handleClick}>
          Pokémon Français
        </button>
        <button value="En" onClick={handleClick}>
          Pokémon Anglais
        </button>
        <input
          type="text"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
        />
      </div>
      {affichage ? (
        <div>
          <h1>Liste de pokémon en {langue}</h1>
          <ul>
            {langue === "Fr"
              ? pokemonFr
                  .filter((pokemon) => {
                    return pokemon.name
                      .toLowerCase()
                      .includes(searchValue.toLowerCase());
                  })
                  .map((pokemon) => (
                    <li key={pokemon.name}>
                      {pokemon.name} - Type : {pokemon.type}
                      <button onClick={() => handleDelete(pokemon.id)}>
                        Supprimer
                      </button>
                    </li>
                  ))
              : pokemonEn
                  .filter((pokemon) => {
                    return pokemon.name
                      .toLowerCase()
                      .includes(searchValue.toLowerCase());
                  })
                  .map((pokemon) => (
                    <li key={pokemon.name}>
                      {pokemon.name} - Type : {pokemon.type}
                      <button onClick={() => handleDelete(pokemon.id)}>
                        Supprimer
                      </button>
                    </li>
                  ))}
          </ul>
        </div>
      ) : (
        <p>Loading ...</p>
      )}
    </>
  );
}

export default App;
