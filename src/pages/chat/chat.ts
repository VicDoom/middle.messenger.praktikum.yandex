import { ChatsController, SocketController } from "../../controllers";
import { Block, IProps } from "../../core/Block";
import { Chat, SelectedChat } from "../../types";
import connect from "../../utils/connect";
import { IChatListProps } from "./components/chat-list/chat-list";

interface IChatProps extends IProps {
  chats: Chat[],
  selectedChat: SelectedChat,
  onSelect: (id: string) => void,
  sendMessage: (message: string) => void,
}

type TChatPageRefs = {
  chat_list: Block<IChatListProps>
}

class ChatPage extends Block<IChatProps, TChatPageRefs> {
  _socket: SocketController | null;
  constructor(props: IChatProps) {
    super({
      ...props,
      onSelect: async (id: string) => { 
        this.refs.chat_list.setProps({ selectedId: id });
        const selectedChatId = Number(id);
        const selectedChat = props.chats.find(chat => chat.id === selectedChatId)!;
        await ChatsController.getChatToken(selectedChatId)
          .then(token => window.store.set({ 
            messages: [], 
            selectedChat: { id: selectedChatId, title: selectedChat.title, token },
          }))
          .catch(error => console.log(error));
        this._createSocket();
      },
      sendMessage: (message: string) => {
        this._socket?.sendMessage(message);
      },
    });
    this._socket = null;
  }

  protected _createSocket() {
    const state = window.store.getState();
    const userId = state.user?.id;
    const { id, token } = state.selectedChat!;
    if (userId && id && token) {
      this._socket = new SocketController({ userId, chatId: id, token });
    }
  }

  protected render(): string {
    return (`
      <div class="chat-page">
        <div class="chat-page-navigation">
            <div class="chat-page-navigation__header">
                {{{ ChatNavigationHeader }}}
            </div>
            <div class="chat-page-navigation__chat-list">
                {{{ ChatList ref="chat_list" chats=chats onSelect=onSelect }}}
            </div>
        </div>
        ${window.store.getState().selectedChat 
        ? `<div class="chat-page-main">
              {{{ ChatMainHeader title=selectedChat.title }}}
              {{{ Divider }}}
              {{{ ChatMainBody }}}
              {{{ Divider }}}
              {{{ ChatMainControls sendMessage=sendMessage }}}
            </div>` 
        : ""}
        {{{ ChatAddUserModal }}}
        {{{ ChatDeleteUserModal }}}
        {{{ ChatCreateModal }}}
      </div>
    `);
  }
}

export default connect(({ chats, user, selectedChat }) => ({ chats, user, selectedChat }))(ChatPage);

// {{#> Modal id="modal-add-user"}}
//             <div class="chat-page__modal">
//                 <div>Добавить пользователя</div>
//                 {{{ Input label="Логин" id="login-add-user" }}}
//                 {{{ Button label="Добавить" }}}
//             </div>
//         {{/ Modal }}
//         {{#> Modal id="modal-delete-user"}}
//             <div class="chat-page__modal">
//                 <div>Удалить пользователя</div>
//                 {{{ Input label="Логин" id="login-delete-user" }}}
//                 {{{ Button label="Удалить" }}}
//             </div>
//         {{/ Modal }}
