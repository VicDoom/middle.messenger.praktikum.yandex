import HTTPTransport from "./index";
import { TCreateUser, TLoginRequestData, TSignUpResponse } from "./types";

const authApi = new HTTPTransport("/auth");

export class AuthApi {
  static async login(data: TLoginRequestData): Promise<XMLHttpRequest> {
    return authApi.post("/signin", { data });
  }
  static async register(data: TCreateUser): Promise<XMLHttpRequest> {
    return authApi.post<TSignUpResponse>("/signup", { data });
  }
  static async me(): Promise<XMLHttpRequest> {
    return authApi.get("/user");
  }
  static async logout(): Promise<XMLHttpRequest> {
    return authApi.post("/logout");
  }
}
