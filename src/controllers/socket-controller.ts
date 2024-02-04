import { TMessageDTO } from "../api/types";
import { Socket } from "../core/Socket";
import { transformMessage } from "../utils/api-helpers";
import { SOCKET_HOST } from "../utils/constants";

type SocketControllerProps = {
  userId: number;
  chatId: number;
  token: string;
}

export class SocketController {
  socket: Socket<TMessageDTO>;
  constructor(props: SocketControllerProps) {
    const { userId, chatId, token } = props;
    this.socket = new Socket({ 
      api: SOCKET_HOST, 
      userId, 
      chatId, 
      token,
      getMessagesHandler: (values: TMessageDTO[]) => this.updateMessages(values),
      openConnectionHandler: this.getMessages.bind(this),
    });
  }

  public sendMessage(message: string) {
    this.socket.sendMessage(message);
  }

  public getMessages(content: string = "0") {
    this.socket.getMessages(content);
  }

  public saveMessages(messages: TMessageDTO[]): void {
    const newMessages = messages.map(message => transformMessage(message));
    window.store.set({ messages: newMessages });
  }

  public updateMessages(messages: TMessageDTO[] | TMessageDTO): void {
    const oldMessages = window.store.getState().messages;
    const newMessages = (Array.isArray(messages) ? messages : [messages]).map(message => transformMessage(message));
    window.store.set({ messages: [...oldMessages, ...newMessages] });
  }

  public resetMessages(): void {
    window.store.set({ messages: [] });
  }
}
