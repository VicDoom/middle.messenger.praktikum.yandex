import HTTPTransport from "./index";

const chatsApi = new HTTPTransport("/chats");

export class ChatsApi {
  static async getChats(title?: string): Promise<XMLHttpRequest> {
    return chatsApi.get("", { data: { title: title ?? "" } });
  }

  static async getChatToken(id: number): Promise<XMLHttpRequest> {
    return chatsApi.post(`/token/${id}`);
  }
}
