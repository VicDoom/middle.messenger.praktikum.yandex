import { Block, IProps } from "../../../../core/Block";

interface IChatControlProps extends IProps {
  style?: string;
}

export class ChatControl extends Block<IChatControlProps> {
  constructor(props: IChatControlProps) {
    super(props);
  }

  protected render(): string {
    const { style } = this.props;
    return (`
      <div class="${style ?? ""} chat-control">
        <img class="chat-control__icon" src={{icons icon-name}} alt={{icon-name}}>
      </div>
    `);
  }
}
