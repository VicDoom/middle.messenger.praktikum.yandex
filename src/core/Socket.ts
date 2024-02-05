interface SocketProps<T> {
  api: string;
  userId: number;
  chatId: number;
  token: string;
  getMessagesHandler: (value: T[]) => void,
  openConnectionHandler: () => void,
}

const PING_INTERVAL = 20000;
const SKIP_MESSAGE_TYPE = ["pong", "user connected"];

export class Socket<T> {
  socket: WebSocket;
  private _ping: number;
  private _getMessagesHandler: (value: T[]) => void;
  private _openConnectionHandler: () => void;
  _userId: number;
  _token: string;
  _chatId: number;
  constructor(props: SocketProps<T>) {
    const { api, userId, chatId, token } = props;
    this._userId = userId;
    this._chatId = chatId;
    this._token = token;
    this.socket = new WebSocket(`${api}/${userId}/${chatId}/${token}`);

    this.socket.addEventListener("open", this._openConnection.bind(this));
    this.socket.addEventListener("close", this._closeConnection.bind(this));
    this.socket.addEventListener("error", this._errorCallback);
    this.socket.addEventListener("message", this._messageCallback.bind(this));

    this._getMessagesHandler = props.getMessagesHandler;
    this._openConnectionHandler = props.openConnectionHandler;

    this._ping = setInterval(() => this._pingCallback(), PING_INTERVAL);
  }

  protected _openConnection() {
    console.log("Connection completed");
    this._openConnectionHandler();
  }

  private _closeConnection(event: CloseEvent) {
    if (event.wasClean) {
      console.log("Соединение закрыто чисто");
    } else {
      console.log("Обрыв соединения");
    }

    console.log(`Код: ${event.code} | Причина: ${event.reason}`);
    clearInterval(this._ping);
  }

  private _errorCallback(event: Event) {
    console.log("Error: ", event);
  }

  private _messageCallback(event: MessageEvent) {
    console.log("Получены данные", event.data);
    const data = JSON.parse(event.data);
    if (SKIP_MESSAGE_TYPE.includes(data.type)) {
      return;
    }
    this._getMessagesHandler(data);
  }

  private _pingCallback() {
    this.socket.send(
      JSON.stringify({
        type: "ping",
      }),
    );
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

  public close() {
    this.socket.close();
  }
}
