import HTTPTransport from "./index";

const resoucesApi = new HTTPTransport("/resources");

export class ResourcesApi {
  static async getResource(src: string): Promise<XMLHttpRequest> {
    return resoucesApi.get(`/${src}`, { responseType: "blob" });
  }
}
