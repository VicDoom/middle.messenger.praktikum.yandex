import { AuthApi } from "../api/auth";
import { TCreateUser, TLoginRequestData, UserDTO } from "../api/types";
import { apiHasError, transformUser } from "../utils/api-helpers";
import { Router } from "../core/Router";

export class AuthController {
  static async getUser () {
    const data = await AuthApi.me();
    if (apiHasError(data.response)) {
      throw Error(data.response.reason);
    }

    return transformUser(data.response as UserDTO);
  }

  static async login (data: TLoginRequestData) {
    const { response } = await AuthApi.login(data);
    if (apiHasError(response)) {
      throw Error(response.reason);
    }

    const me = await this.getUser();
    window.store.set({ user: me });

    const router = new Router();
    router.go("/profile");
  }

  static async register(data: TCreateUser) {
    const { response } = await AuthApi.register(data);
    if (apiHasError(response)) {
      throw new Error(response.reason);
    }

    const me = await this.getUser();
    window.store.set({ user: me });
    
    const router = new Router();
    router.go("/profile");
  }

  static async logout() {
    const { response } = await AuthApi.logout();
    if (apiHasError(response)) {
      throw new Error(response.reason);
    }

    const router = new Router();
    router.go("/login");
  }
};
