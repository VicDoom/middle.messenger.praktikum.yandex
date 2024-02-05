import HTTPTransport from "./index";

const chatsApi = new HTTPTransport("/chats");

export class ChatsApi {
  static async create(title: string): Promise<XMLHttpRequest> {
    return chatsApi.post("", { data: { title } });
  }

  static async getChats(title?: string): Promise<XMLHttpRequest> {
    return chatsApi.get("", { data: { title: title ?? "" } });
  }

  static async getChatToken(id: number): Promise<XMLHttpRequest> {
    return chatsApi.post(`/token/${id}`);
  }

  static async getUsers(id: number): Promise<XMLHttpRequest> {
    return chatsApi.get(`/${id}/users`);
  }

  static async addUser(userId: number, chatId: number): Promise<XMLHttpRequest> {
    return chatsApi.put("/users", { data: { users: [userId], chatId } });
  }

  static async deleteUser(userId: number, chatId: number): Promise<XMLHttpRequest> {
    return chatsApi.delete("/users", { data: { users: [userId], chatId } });
  }
}
