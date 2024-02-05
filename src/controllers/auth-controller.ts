import { AuthApi } from "../api/auth";
import { TCreateUser, TLoginRequestData, UserDTO } from "../api/types";
import { apiHasError, transformUser } from "../utils/api-helpers";
import { Router } from "../core/Router";
import { ResourcesController } from ".";

export class AuthController {
  static async getUser () {
    const data = await AuthApi.me();
    if (apiHasError(data.response, data.status)) {
      throw Error(data.response.reason);
    }

    return transformUser(data.response as UserDTO);
  }

  static async login (data: TLoginRequestData) {
    const { response, status } = await AuthApi.login(data);
    if (apiHasError(response, status)) {
      if (response.reason !== "User already in system") {
        throw Error(response.reason);
      }
    }

    const me = await this.getUser();
    window.store.set({ user: me });

    ResourcesController.getAvatar(me.avatar);

    const router = new Router();
    router.go("/profile");
  }

  static async register(data: TCreateUser) {
    const { response, status } = await AuthApi.register(data);
    if (apiHasError(response, status)) {
      throw new Error(response.reason);
    }

    const me = await this.getUser();
    window.store.set({ user: me });
    
    const router = new Router();
    router.go("/profile");
  }

  static async logout() {
    const { response, status } = await AuthApi.logout();
    if (apiHasError(response, status)) {
      throw new Error(response.reason);
    }

    window.store.set({ user: null, avatarHref: undefined, chats: [] });

    const router = new Router();
    router.go("/login");
  }
};
