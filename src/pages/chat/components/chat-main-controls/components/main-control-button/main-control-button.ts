import { Block, IProps } from "../../../../../../core/Block";

interface IMainControlButtonProps extends IProps {
  ref: string;
  onSubmit: (event: Event | KeyboardEvent) => void;
}

type TMainControlButtonRefs = {
  main_control_button: Block<{}, {}, HTMLInputElement>,
}

export class MainControlButton extends Block<IMainControlButtonProps, TMainControlButtonRefs> {
  constructor(props: IMainControlButtonProps) {
    super({
      ...props,
      events: {
        click: props.onSubmit,
      },
    });
  }

  protected render(): string {
    return (`
      <div class="chat-main-controls__send">
        <img src={{icons "icon-send"}} alt="send">
      </div>
    `);
  }
}
