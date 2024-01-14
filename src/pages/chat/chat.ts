import { Block } from "../../core/Block";
import { CHAT_ELEMENTS, CURRENT_CHAT } from "../../mocks";
import { IChatListProps } from "./components/chat-list/chat-list";

type TChatPageRefs = {
  chat_list: Block<IChatListProps>
}

export class ChatPage extends Block<{}, TChatPageRefs> {
  constructor() {
    super({
      chats: CHAT_ELEMENTS,
      currentUser: CURRENT_CHAT.user,
      messages: CURRENT_CHAT.messages,
      onSelect: (id: string) => { 
        this.refs.chat_list.setProps({ selectedId: id });
        console.log(`Был выбран чат с id ${id}`);
      },
    });
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
        <div class="chat-page-main">
            {{{ ChatMainHeader current_user=currentUser }}}
            {{{ Divider }}}
            {{{ ChatMainBody messages=messages }}}
            {{{ Divider }}}
            {{{ ChatMainControls }}}
        </div>
        {{#> Modal id="modal-add-user"}}
            <div class="chat-page__modal">
                <div>Добавить пользователя</div>
                {{{ Input label="Логин" id="login-add-user" }}}
                {{{ Button label="Добавить" }}}
            </div>
        {{/ Modal}}
        {{#> Modal id="modal-delete-user"}}
            <div class="chat-page__modal">
                <div>Удалить пользователя</div>
                {{{ Input label="Логин" id="login-delete-user" }}}
                {{{ Button label="Удалить" }}}
            </div>
        {{/ Modal}}
      </div>
    `);
  }
}

