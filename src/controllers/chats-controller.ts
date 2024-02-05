import { ChatsApi } from "../api/chats";
import { apiHasError, transformChats } from "../utils/api-helpers";

export class ChatsController {
  static async create(title: string) {
    const { response, status } = await ChatsApi.create(title);
    if (apiHasError(response, status)) {
      throw Error(response.reason);
    }
    
    await this.getChats();
    window.store.set({ isOpenCreateChatModal: false });
    return response;
  }
  static async getChats (title?: string) {
    const { response, status } = await ChatsApi.getChats(title);
    if (apiHasError(response, status)) {
      throw Error(response.reason);
    }
    const chats = transformChats(response);
    window.store.set({ chats });
    return transformChats(response);
  }

  static async getChatToken(id: number) {
    const { response, status } = await ChatsApi.getChatToken(id);
    if (apiHasError(response, status)) {
      throw Error(response.reason);
    }

    return response.token;
  }

  static async getUsers(id: number) {
    const { response, status } = await ChatsApi.getUsers(id);
    if (apiHasError(response, status)) {
      throw Error(response.reason);
    }

    return response;
  }

  static async addUser(userId: number, chatId: number) {
    const { response, status } = await ChatsApi.addUser(userId, chatId);
    if (apiHasError(response, status)) {
      throw Error(response.reason);
    }

    window.store.set({ isOpenAddUserChatModal: false });
  }

  static async deleteUser(userId: number, chatId: number) {
    const { response, status } = await ChatsApi.deleteUser(userId, chatId);
    if (apiHasError(response, status)) {
      throw Error(response.reason);
    }
    window.store.set({ isOpenDeleteUserChatModal: false });
    const isCurrentDeleted = window.store.getState().user?.id === userId;
    if (isCurrentDeleted) {
      window.store.set({ selectedChat: null });
      await this.getChats();
    }
  }
};
