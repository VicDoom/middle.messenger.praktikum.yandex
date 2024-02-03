import HTTPTransport from "./index";
import { TEditPasswordData, TEditProfileData } from "./types";

const authApi = new HTTPTransport("/user");

export class UserApi {
  static async editProfile(data: TEditProfileData): Promise<XMLHttpRequest> {
    return authApi.put("/profile", { data });
  }
  static async editPassword(data: TEditPasswordData): Promise<XMLHttpRequest> {
    return authApi.put("/password", { data });
  }
  static async editAvatar(data: FormData): Promise<XMLHttpRequest> {
    return authApi.put("/profile/avatar", { data, isFormData: true });
  }
}
