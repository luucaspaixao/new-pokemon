export class NotFoundError extends Error {
  constructor() {
    super('Não foram encontrados pokemons na requisição')
    this.name = 'NotFoundError'
  }
}