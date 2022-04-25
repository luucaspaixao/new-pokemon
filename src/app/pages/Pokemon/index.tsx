import React, { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import { Pokemon } from "../../../models/Pokemon"
import { pokemonService } from "../../services/pokemonService"
import notFoundPoke from "../../../assets/notfoundpoke.png"
import styled, {css} from "styled-components"

const PokemonContainer = styled.div`
  background-color: #fefffe;
  width: 300px;
  border-radius: 1rem;
  box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);
  padding: 1rem;
  margin: 0 auto;
  margin-top: 6rem;
`
const PokemonDetails = styled.div`
  position: relative;
  top: -6rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;

  & > img {
    width: 150px;
    height: 150px;
    object-fit: contain;
  }
`

const PokeTypes = styled.div`
  display: flex;
  gap: .5rem;

  img {
    width: 70px;
    height: 30px;
    object-fit: contain;
  }
`

const ItemTitle = styled.p`
  font-size: 1.25rem;
  font-weight: bold;
  color: rgb(25,25,25);
`

const PokeAbilities = styled.div`
  display: flex;
  gap: .5rem;
`

type AbilityProps = {
  isHidden: boolean
}

const Ability = styled.span<AbilityProps>`
  padding: .25rem .5rem;
  font-weight: bold;
  position: relative;

  display: flex;
  justify-content: space-between;

  ${props => props.isHidden && css`
    &::after {
      content: "H";
    }
  `}
`

const PokeInfo = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;

  div {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: .5rem;
  }
`

const ValuePokeInfo = styled.span`
  width: 100%;
  padding: .25rem .5rem;
  display: flex;
  align-items: center;
  justify-content: center;
`

type Props = {
  name: string | undefined;
}

export const PokemonDetail: React.FC<Props> = ({name}) => {
  if(!name) return null

  const [pokemon, setPokemon] = useState<Pokemon>()

  useEffect(() => {
    pokemonService.getPokemon(name)
    .then(data => setPokemon(data))
    .catch(err => console.log(err))
  },[name])

  if(!pokemon) return null

  return (
    <PokemonContainer>
      <PokemonDetails>
        <img src={pokemon.sprite || notFoundPoke} alt={pokemon.name} />
        <strong>#{pokemon.id}</strong>
        <h2>{pokemon.name}</h2>
        <PokeTypes>
          {
            pokemon.types.map(type => 
              <img 
                key={type.type.name} 
                src={`/src/assets/badgetypes/${type.type.name}.png`} 
                alt={type.type.name}
              />
            )
          }
        </PokeTypes>
        <ItemTitle>
          ABILITIES
        </ItemTitle>
        <PokeAbilities>
          {
            pokemon.abilities.map(ability => <Ability isHidden={ability.is_hidden}>{ability.ability.name}</Ability>)
          }
        </PokeAbilities>
        <PokeInfo>
          <div>
            <ItemTitle>
              HEIGHT
            </ItemTitle>
            <ValuePokeInfo>
              {pokemon.height}
            </ValuePokeInfo>
          </div>
          <div>
            <ItemTitle>
              HEIGHT
            </ItemTitle>
            <ValuePokeInfo>
              {pokemon.height}
            </ValuePokeInfo>
          </div>
          <div>
            <ItemTitle>
              WEIGHT
            </ItemTitle>
            <ValuePokeInfo>
              {pokemon.weight}
            </ValuePokeInfo>
          </div>
          <div>
            <ItemTitle>
              HEIGHT
            </ItemTitle>
            <ValuePokeInfo>
              {pokemon.height}
            </ValuePokeInfo>
          </div>
        </PokeInfo>
      </PokemonDetails>
      {/* <Link to="/">Homepage</Link>
      <h1>{pokemon?.name}</h1>
      {
        pokemon?.types.map(type => 
          <img key={type.type.name} src={`/src/assets/badgetypes/${type.type.name}.png`} alt={type.type.name}/>
        )
      } */}
    </PokemonContainer>
  )
}