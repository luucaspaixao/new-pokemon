import axios, { AxiosResponse } from "axios";
import { HttpClient, HttpRequest, HttpResponse } from "./HttpClient";

export class AxiosClient implements HttpClient {
  async execute(request: HttpRequest): Promise<HttpResponse> {
    let axiosResponse: AxiosResponse

    try {
      axiosResponse = await axios.request(request)
    } catch (error: any) {
      axiosResponse = error.response
    }

    return {
      statusCode: axiosResponse.status,
      body: axiosResponse.data
    }
  }
}