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

  static async getUsers(id: number) {
    const { response } = await ChatsApi.getUsers(id);
    if (apiHasError(response)) {
      throw Error(response.reason);
    }

    return response;
  }

  static async addUser(userId: number, chatId: number) {
    const { response } = await ChatsApi.addUser(userId, chatId);
    if (apiHasError(response)) {
      throw Error(response.reason);
    }

    window.store.set({ isOpenAddUserChatModal: false });
  }

  static async deleteUser(userId: number, chatId: number) {
    const { response } = await ChatsApi.deleteUser(userId, chatId);
    if (apiHasError(response)) {
      throw Error(response.reason);
    }

    window.store.set({ isOpenDeleteUserChatModal: false });
  }
};
