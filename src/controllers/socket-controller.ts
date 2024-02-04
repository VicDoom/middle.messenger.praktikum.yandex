import { Socket } from "../core/Socket";
import { SOCKET_HOST } from "../utils/constants";

type SocketControllerProps = {
  userId: number;
  chatId: number;
  token: string;
}

export class SocketController {
  socket: Socket;
  constructor(props: SocketControllerProps) {
    const { userId, chatId, token } = props;
    this.socket = new Socket({ api: SOCKET_HOST, userId, chatId, token });
  }

  public sendMessage(message: string) {
    this.socket.sendMessage(message);
  }

  public getMessages(content: string = "0") {
    this.socket.getMessages(content);
  }
}
