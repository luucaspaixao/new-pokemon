import { useEffect, useState } from "react";
import notFoundPoke from "../../../assets/notfoundpoke.png"
import { Link } from "react-router-dom";
import { PokemonListResult } from "../../../models/PokemonList";
import { pokemonService } from "../../services/pokemonService";
import { Container } from "./styles";
import { PokemonDetail } from "../Pokemon";

export const Index: React.FC = () => {
  const [data, setData] = useState<PokemonListResult[]>([])
  const [pokemonName, setPokemonName] = useState<string>()

  useEffect(() => {
    pokemonService.getAllPokemons()
    .then(data => setData(data.results))
    .catch((err: Error)=> console.log(err.message))
  }, [])
  
  return (
    <Container>
      {
        data?.map((poke, index) => {
          return (
            <button key={index} onClick={() => setPokemonName(poke.name)}>
              <img 
                style={{
                  width: '50px',
                  height: '50px',
                  objectFit: 'contain'
                }}  
                src={poke.sprite || notFoundPoke} 
                alt={poke.name} 
              />
            </button>
          )
          
        })
      }
      <PokemonDetail name={pokemonName}/>
    </Container>
  )
}