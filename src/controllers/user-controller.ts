import { TEditPasswordData, TEditProfileData, UserDTO } from "../api/types";
import { apiHasError, transformUser } from "../utils/api-helpers";
import { UserApi } from "../api/user";
import { Router } from "../core/Router";
import { getUpdatedFields } from "../helpers";

export class UserController {
  static async editProfile(data: TEditProfileData) {
    // const currentUserInfo = window.store.getState().user;
    // const changes = getUpdatedFields(currentUserInfo, data);
    const { response } = await UserApi.editProfile(data);
    if (apiHasError(response)) {
      throw Error(response.reason);
    }

    const me = transformUser(response as UserDTO);
    window.store.set({ user: me });

    const router = new Router();
    router.go("/profile");
  }

  static async editPassword(data: TEditPasswordData) {
    const { response } = await UserApi.editPassword(data);
    if (apiHasError(response)) {
      throw Error(response.reason);
    }

    const router = new Router();
    // заменить на login
    router.go("/profile");
  }
};
