import { Block, IProps } from "../../../../core/Block";
import { Chat } from "../../../../types";

export interface IChatListProps extends IProps {
  selectedId: string;
  chats: Chat[],
  onSelect: (id: string) => void,
}

export class ChatList extends Block<IChatListProps> {
  constructor(props: IChatListProps) {
    super({
      ...props,
      onSelect: props.onSelect,
    });
  }

  protected render(): string {
    const { chats } = this.props;
    const selectedChatId = window.store.getState().selectedChat?.id;
    return (`
    <div class="chat-list">
      ${chats.map(({ id, title, unreadCount, lastMessage }) => (
        `{{{ ChatElement 
             id='${id}'
             title='${title}'
             message='${lastMessage?.content ?? ""}'
             time='${lastMessage?.time ?? ""}'
             messageNumber='${unreadCount}' 
             currentChat='${id === selectedChatId}'
             onClick=onSelect
          }}}`
      )).join("")}
    </div>
    `);
  }
}
