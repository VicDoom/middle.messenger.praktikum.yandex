import { Block, IProps } from "../../../../core/Block";
import { getTime, sortMessages } from "../../../../helpers";
import { Message } from "../../../../types";
import connect from "../../../../utils/connect";

interface IChatMainBodyProps extends IProps {
  messages?: Message[],
}

class ChatMainBody extends Block<IChatMainBodyProps> {
  constructor(props: IChatMainBodyProps) {
    super(props);
  }

  protected render(): string {
    const messages = sortMessages(window.store.getState().messages);
    const currentUserId = window.store.getState().user?.id;
    return (`
      <div class="chat-main-body">
        {{#each messages}}
            
        {{/each}}
        ${messages?.map(({ id, content, time, userId }) => (
        `
          <div 
                class='chat-main-body__message ${userId === currentUserId && "chat-main-body__message--yours"}'
                key=${id}
            >
                <div class="chat-main-body__message-text">
                    ${content}
                </div>
                <div class="chat-main-body__message-date">
                    ${getTime(new Date(time))}
                </div>
          </div>
          `
      )).join("")}
      </div>
    `);
  }
}

export default connect(({ messages }) => ({ messages }))(ChatMainBody);
