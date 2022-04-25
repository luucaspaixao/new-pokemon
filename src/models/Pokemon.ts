type Abilities = {
  ability: {
    name: string,
    url: string
  },
  is_hidden: boolean,
}

type Stats = {
  base_stat: number,
  stat: {
    name: string
  }
}

type Types = {
  type: {
    name: string,
  }
}

export interface Pokemon {
  abilities: Abilities[],
  base_experience: number,
  height: number,
  weight: number,
  id: number,
  is_default: boolean,
  name: string,
  stats: Stats[],
  types: Types[],
  sprite: string,
}