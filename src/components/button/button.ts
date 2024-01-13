import { Block } from "../../core/Block";

interface IButtonProps {
  type?: "link" | "default"
  label?: string,
  color?: "red" | "default",
  onClick?: () => void,
  events?: { click: () => void }
}

export class Button extends Block<IButtonProps> {
  constructor(props: IButtonProps) {
    super({ type: "default", color: "default", ...props });
  }

  protected init(): void {
    this.props.events = {
      click: this.props.onClick ?? (() => {}),
    }
  }

  protected render(): string {
    const { type, color, label } = this.props;
    return (`
      <div class="button button__${type} button--${color}">
        ${label}
      </div>
    `)
  }
}
