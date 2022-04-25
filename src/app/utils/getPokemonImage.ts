import axios from "axios"

function pad(number: number, length: number) {
  let str = '' + number;
  while (str.length < length) {
    str = '0' + str;
  }
  return str;
}

const getAnimatedPokemon = async (id: string) => {
  const url = import.meta.env.VITE_URL_SPRITES_GIF + id + '.gif'

  try {
    await axios.get(url)
    return url
  } catch {
    return ''
  }
}

const getDefaultSprite = async (id: string) => {
  const url = import.meta.env.VITE_URL_SPRITES_DEFAULT + id + '.png'

  try {
    await axios.get(url)
    return url
  } catch {
    return ''
  }
}

const getOfficialSprite = async (id: string) => {
  const url = import.meta.env.VITE_URL_SPRITES_OFFICIAL + id + '.png'
  
  try {
    await axios.get(url)
    return url
  } catch {
    return ''
  }
}

const getHDSprite = async (id: string) => {
  const url = import.meta.env.VITE_URL_SPRITES_OFF + pad(Number(id), 3) + '.png'
  
  try {
    await axios.get(url)
    return url
  } catch {
    return ''
  }
  
}

export const getPokemonImage = async (id: string, isOficial?: boolean) => {
  let sprite: string;

  if(!isOficial){
    sprite = await getAnimatedPokemon(id)
    if(sprite) return sprite
  }

  sprite = await getHDSprite(id)

  if(sprite) return sprite

  sprite = await getDefaultSprite(id)

  if(sprite) return sprite

  sprite = await getOfficialSprite(id)

  return sprite
}