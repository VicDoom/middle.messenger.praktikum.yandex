import { ResourcesApi } from "../api/resouses";

export class ResourcesController {
  static async getAvatar (src?: string) {
    if (!src) {
      return;
    }
    const { response } = await ResourcesApi.getResource(src);
    if (response.reason) {
      throw new Error("Аватар отсутствует");
    }

    const url = window.URL.createObjectURL(response);
    window.store.set({ avatarHref: url });

    return url;
  }
};
