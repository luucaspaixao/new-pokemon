export type PokemonListResult = {
  name: string,
  url: string,
  sprite: string
}

export interface PokemonList {
  count: number,
  next: string | null,
  previous: string | null,
  results: PokemonListResult[]
}

