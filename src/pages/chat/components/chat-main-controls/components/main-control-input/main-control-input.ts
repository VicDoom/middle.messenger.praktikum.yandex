import { Block, IProps } from "../../../../../../core/Block";

interface IMainControlInputProps extends IProps {
  ref: string;
  onKeyUp: (event: Event | KeyboardEvent) => void;
}

type TMainControlInputRefs = {
  main_control_input: Block<{}, {}, HTMLInputElement>,
}

export class MainControlInput extends Block<IMainControlInputProps, TMainControlInputRefs, HTMLInputElement> {
  constructor(props: IMainControlInputProps) {
    super({
      ...props,
      events: {
        keyup: props.onKeyUp,
      },
    });
  }

  resetValue() {
    if (this.element?.value) {
      this.element.value = "";
    }
  }

  protected render(): string {
    return (`
      <input
        ref="main_control_input"
        class="chat-main-controls__input-component"
        type="text"
        placeholder="Сообщение"
      >
    `);
  }
}
