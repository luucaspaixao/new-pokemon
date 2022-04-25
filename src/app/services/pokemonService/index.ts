import { AxiosClient } from "../../../api/AxiosClient";
import { NotFoundError } from "../../../api/errors/NotFoundError";
import { ServerError } from "../../../api/errors/ServerError";
import { HttpClient, HttpStatusCode,  } from "../../../api/HttpClient";
import { Pokemon } from "../../../models/Pokemon";
import { PokemonList } from "../../../models/PokemonList";
import { getPokemonIdFromUrl } from "../../utils/getPokemonIdFromUrl";
import { getPokemonImage } from "../../utils/getPokemonImage";

class PokemonService {
  private readonly baseUrl = import.meta.env.VITE_API_URL

  constructor(private readonly httpClient: HttpClient){}

  async getAllPokemons(offset?: number, limit?: number) {
    const response = await this.httpClient.execute<PokemonList>({
      url: `${this.baseUrl}/pokemon?offset=${offset || 0}&limit=${limit || 20}`,
      method: 'get'
    })

    const pokemonList = response.body || []

    pokemonList.results = await Promise.all(pokemonList.results.map(async (pokemon) => {
      const pokemonId = getPokemonIdFromUrl(pokemon.url)
      const pokemonSprite = await getPokemonImage(pokemonId)

      return {
        ...pokemon,
        sprite: pokemonSprite
      }
    }))
    
    switch (response.statusCode) {
      case HttpStatusCode.ok: return pokemonList
      case HttpStatusCode.notFound: throw new NotFoundError()
      default: throw new ServerError()
    }
  }

  async getPokemon(name: string) {
    const response = await this.httpClient.execute<Pokemon>({
      url: `${this.baseUrl}/pokemon/${name}`,
      method: 'get'
    })

    const pokemonSprite = await getPokemonImage(response.body.id.toString(), true)

    const pokemon = {
      ...response.body,
      sprite: pokemonSprite
    } || null


    switch (response.statusCode) {
      case HttpStatusCode.ok: return pokemon
      case HttpStatusCode.notFound: throw new NotFoundError()
      default: throw new ServerError()
    }
  }

  async getPokemonWeakness(type: string) {
    const response = await this.httpClient.execute({
      url: `${this.baseUrl}/type/${type}`,
      method: 'get'
    })

    switch (response.statusCode) {
      case HttpStatusCode.ok: return response.body
      case HttpStatusCode.notFound: throw new NotFoundError()
      default: throw new ServerError()
    }
  }
}

export const pokemonService = new PokemonService(new AxiosClient())