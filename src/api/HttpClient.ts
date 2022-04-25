export type HttpRequest = {
  url: string,
  method: 'get'
}

export enum HttpStatusCode {
  ok = 200,
  badRequest = 400,
  notFound = 404,
  serverError = 500
}

export type HttpResponse<T = any> = {
  statusCode: HttpStatusCode,
  body: T
}

export interface HttpClient {
  execute<T = any>(request: HttpRequest): Promise<HttpResponse<T>>
}