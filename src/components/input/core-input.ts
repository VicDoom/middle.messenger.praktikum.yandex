import { Block } from "../../core/Block";

interface ICoreInputProps {
  className: string,
  placeholder: string,
  disabled: boolean,
  type: string;
  onBlur: (e: Event) => void,
  events: { [name: string]: (e: Event) => void };
}

export class CoreInput extends Block<ICoreInputProps> {
  constructor(props: ICoreInputProps) {
    super({
      ...props,
      events: {
        blur: (e) => props.onBlur(e),
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
