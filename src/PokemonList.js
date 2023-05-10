import React, { useState, useEffect } from 'react';
import axios from 'axios';

function PokemonList(props) {
  const [pokemonList, setPokemonList] = useState([]);

  useEffect(() => {
    axios.get(props.route)
      .then(response => {
        setPokemonList(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  }, [props.route]);

  return (
    <div>
      <h1>{props.title}</h1>
      <ul>
        {pokemonList.map(pokemonName => (
          <li key={pokemonName}>{pokemonName}</li>
        ))}
      </ul>
    </div>
  );
}

export default PokemonList;