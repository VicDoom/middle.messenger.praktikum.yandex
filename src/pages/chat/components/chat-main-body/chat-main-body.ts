import { Block, IProps } from "../../../../core/Block";
import { getTime } from "../../../../helpers";
import { IChatMessage } from "../../../../types";

interface IChatMainBody extends IProps {
  messages: IChatMessage[];
}

export class ChatMainBody extends Block<IChatMainBody> {
  constructor(props: IChatMainBody) {
    super(props);
  }

  protected render(): string {
    const { messages } = this.props;
    const formattedMessages = messages?.map((value) => ({ ...value, date: getTime(value.date) }));
    return (`
      <div class="chat-main-body">
        {{#each messages}}
            
        {{/each}}
        ${formattedMessages?.map(({ id, message, date, isYours }) => (
        `
          <div 
                class='chat-main-body__message ${isYours && "chat-main-body__message--yours"}'
                key=${id}
            >
                <div class="chat-main-body__message-text">
                    ${message}
                </div>
                <div class="chat-main-body__message-date">
                    ${date}
                </div>
          </div>
          `
      )).join("")}
      </div>
    `);
  }
}
