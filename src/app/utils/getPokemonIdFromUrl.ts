export const getPokemonIdFromUrl = (url: string) => {  
  return url.substring(34, url.length - 1)
}