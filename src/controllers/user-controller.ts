import { TEditProfileData, UserDTO } from "../api/types";
import { apiHasError, transformUser } from "../utils/api-helpers";
import { UserApi } from "../api/user";
import { Router } from "../core/Router";
import { ResourcesController } from ".";

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

  static async editPassword(data: FormData) {
    const { response } = await UserApi.editAvatar(data);
    if (apiHasError(response)) {
      throw Error(response.reason);
    }

    const router = new Router();
    // заменить на login
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

    const { response } = await UserApi.editAvatar(form);
    if (apiHasError(response)) {
      throw Error(response.reason);
    }

    const me = transformUser(response as UserDTO);
    window.store.set({ user: me });

    await ResourcesController.getAvatar();
  }

  static async search(login: string) {
    const { response } = await UserApi.search({ login });
    if (apiHasError(response)) {
      throw Error(response.reason);
    }

    const users = (response as UserDTO[]).map(user => transformUser(user));
    return users;
  }
};
