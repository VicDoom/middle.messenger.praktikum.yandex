import { ChatsApi } from "../api/chats";
import { apiHasError, transformChats } from "../utils/api-helpers";

export class ChatsController {
  static async getChats (title?: string) {
    const { response } = await ChatsApi.getChats(title);
    if (apiHasError(response)) {
      throw Error(response.reason);
    }

    return transformChats(response);
  }

  static async getChatToken(id: number) {
    const { response } = await ChatsApi.getChatToken(id);
    if (apiHasError(response)) {
      throw Error(response.reason);
    }

    return response.token;
  }
};
