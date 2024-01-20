import { Block, IProps } from "../../../../core/Block";
import { IChatElement } from "../../../../types";

export interface IChatListProps extends IProps {
  selectedId: string;
  chats: IChatElement[],
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
    const { chats, selectedId } = this.props;
    return (`
    <div class="chat-list">
      ${chats.map(({ id, user, message, date, messageNumber }) => (
        `{{{ ChatElement 
             id='${id}'
             user='${user}'
             message='${message}'
             date='${date}'
             messageNumber='${messageNumber}' 
             currentChat='${id === selectedId}'
             onClick=onSelect
          }}}`
      )).join("")}
    </div>
    `);
  }
}
