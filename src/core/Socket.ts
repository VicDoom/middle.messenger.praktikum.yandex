interface SocketProps {
  api: string;
  userId: number;
  chatId: number;
  token: string;
}

export class Socket {
  socket: WebSocket;
  private _userId: number;
  private _token: string;
  private _chatId: number;
  constructor(props: SocketProps) {
    const { api, userId, chatId, token } = props;
    this._userId = userId;
    this._chatId = chatId;
    this._token = token;
    this.socket = new WebSocket(`${api}/${userId}/${chatId}/${token}`);

    this.socket.addEventListener("open", this._openConnection);
    this.socket.addEventListener("close", this._closeConnection);
    this.socket.addEventListener("error", this._errorCallback);
    this.socket.addEventListener("message", this._messageCallback);
  }

  private _openConnection() {
    console.log("Connection completed");
  }

  private _closeConnection(event: CloseEvent) {
    if (event.wasClean) {
      console.log("Соединение закрыто чисто");
    } else {
      console.log("Обрыв соединения");
    }

    console.log(`Код: ${event.code} | Причина: ${event.reason}`);
  }

  private _errorCallback(event: Event) {
    console.log("Error: ", event);
  }

  private _messageCallback(event: MessageEvent) {
    console.log("Получены данные", event.data);
  }

  public sendMessage(message: string) {
    this.socket.send(
      JSON.stringify({
        content: message,
        type: "message",
      }),
    );
  }

  public getMessages(content: string) {
    this.socket.send(
      JSON.stringify({
        content,
        type: "get old",
      }),
    );
  }
}
