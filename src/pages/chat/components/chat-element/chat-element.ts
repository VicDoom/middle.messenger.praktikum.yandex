import { Block, IProps } from "../../../../core/Block";
import { getTime } from "../../../../helpers";

interface IChatElementProps extends IProps {
  id: string;
  user: string;
  message: string;
  date: string;
  messageNumber?: number;
  currentChat: string;
  onClick: (id: string) => void;
}

export class ChatElement extends Block<IChatElementProps> {
  constructor(props: IChatElementProps) {
    super({ 
      ...props,
      events: {
        click: () => props.onClick(props.id),
      },
    });
  }

  protected render(): string {
    const { id, user, message, date, messageNumber, currentChat } = this.props;
    const formattedCurrentChat = currentChat === "true" ? true : false;
    const formattedTime = getTime(new Date(date));
    const messageNumberElement = 
      +(messageNumber ?? 0) ? (
        `<div class="chat-element__info-number">${messageNumber}</div>`
      ) : "";
    return (`
      <div id=${id} class="chat-element ${formattedCurrentChat ? "chat-element--selected" : ""}">
        {{{ Divider }}}
        <div class="chat-element__content">
            <div class="chat-element__avatar"></div>
            <div class="chat-element__message">
                <div class="chat-element__message-user">
                  ${user}
                </div>
                <div class="chat-element__message-text">
                  ${message}
                </div>
            </div>
            <div class="chat-element__info">
                <div class="chat-element__info-date">${formattedTime}</div>
                ${messageNumberElement}
            </div>
        </div>
      </div>
    `);
  }
}
