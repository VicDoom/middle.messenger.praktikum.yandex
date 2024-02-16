import { TEditProfileData, UserDTO } from "../api/types";
import { apiHasError, transformUser } from "../utils/api-helpers";
import { UserApi } from "../api/user";
import { Router } from "../core/Router";
import { ResourcesController } from ".";

export class UserController {
  static async editProfile(data: TEditProfileData) {
    // const currentUserInfo = window.store.getState().user;
    // const changes = getUpdatedFields(currentUserInfo, data);
    const { response, status } = await UserApi.editProfile(data);
    if (apiHasError(response, status)) {
      throw Error(response.reason);
    }

    const me = transformUser(response as UserDTO);
    window.store.set({ user: me });

    const router = new Router();
    router.go("/profile");
  }

  static async editPassword(newPassword: string, oldPassword: string) {
    const { response, status } = await UserApi.editPassword({ newPassword, oldPassword });
    if (apiHasError(response, status)) {
      throw Error(response.reason);
    }

    const router = new Router();
    router.go("/profile");
  }

  static async editAvatar() {
    const form = new FormData();
    const avatar = document.getElementById("avatar") as HTMLInputElement;
    const avatarFile = avatar.files?.[0];
    if (!avatarFile) {
      throw new Error("Выберите файл!");
    }
    form.append("avatar", avatarFile);

    const { response, status } = await UserApi.editAvatar(form);
    if (apiHasError(response, status)) {
      throw Error(response.reason);
    }

    const me = transformUser(response as UserDTO);
    window.store.set({ user: me });

    await ResourcesController.getAvatar(me.avatar);
  }

  static async search(login: string) {
    const { response, status } = await UserApi.search({ login });
    if (apiHasError(response, status)) {
      throw Error(response.reason);
    }

    const users = (response as UserDTO[]).map(user => transformUser(user));
    return users;
  }
};
