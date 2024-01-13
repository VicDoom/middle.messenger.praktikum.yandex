import { Block, IProps } from "../../core/Block";

interface IButtonBackProps extends IProps {
  onClick: () => void,
}

export class ButtonBack extends Block<IButtonBackProps> {
  constructor(props: IButtonBackProps) {
    super({
      ...props,
      events: {
        click: props.onClick,
      },
    });
  }

  protected render(): string {
    return(`
      <div class="button-back">
        <div class="button-back__wrapper">
          <img src={{icons "icon-back"}} alt="icon-back" page="{{page}}">
        </div>
      </div>
    `);
  }
}
