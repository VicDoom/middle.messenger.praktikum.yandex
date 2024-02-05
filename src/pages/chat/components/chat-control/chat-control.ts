import { Block, IProps } from "../../../../core/Block";

interface IChatControlProps extends IProps {
  style?: string;
  onClick: () => void;
}

export class ChatControl extends Block<IChatControlProps> {
  constructor(props: IChatControlProps) {
    super({
      ...props,
      events: {
        click: () => this.props.onClick(),
      },
    });
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
