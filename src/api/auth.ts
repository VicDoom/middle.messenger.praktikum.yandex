import HTTPTransport from "./index";
import { TCreateUser, TSignUpResponse } from "./types";

const authApi = new HTTPTransport("/auth");

export type LoginRequestData = {
  login: string,
  password: string,
}

export class AuthApi {
  static async login(data: LoginRequestData): Promise<XMLHttpRequest> {
    return authApi.post("/signin", { data });
  }
  static async register(data: TCreateUser): Promise<XMLHttpRequest> {
    return authApi.post<TSignUpResponse>("/signup", { data })
  }
  static async me(): Promise<XMLHttpRequest> {
    return authApi.get("/user");
  }
}
