import { Block } from "../../core/Block";

interface ICoreInputProps {
  className: string,
  placeholder: string,
  disabled: boolean,
  type: string;
  onBlur: (e: Event) => void,
  onKeyUp: (e: KeyboardEvent) => void,
  events: { [name: string]: (e: Event | KeyboardEvent) => void };
}

export class CoreInput extends Block<ICoreInputProps> {
  constructor(props: ICoreInputProps) {
    super({
      ...props,
      events: {
        blur: (e) => props.onBlur(e),
        keyup: (e) => props.onKeyUp(e as KeyboardEvent),
      },
    });
  };

  protected render(): string {
    const { className, placeholder, disabled, type } = this.props;
    return (`
      <input
        class="${className}"
        placeholder="${placeholder || ""}"
        type="${type}"
        ${disabled ? "disabled" : ""}
      />
    `);
  };
}
