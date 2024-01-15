import { Block } from "../../core/Block";

interface IButtonProps {
  type?: "link" | "default"
  label?: string,
  color?: "red" | "default",
  action?: string,
  form?: string,
  onClick?: () => void,
  events?: { click: (e: Event) => void }
}

export class Button extends Block<IButtonProps> {
  constructor(props: IButtonProps) {
    super({ type: "default", color: "default", ...props });
  }

  protected init(): void {
    const onClick = this.props.onClick ?? (() => {});
    this.props.events = {
      click: (e: Event) => {
        e.preventDefault();
        onClick();
      },
    };
  }

  protected render(): string {
    const { type, color, label, action, form } = this.props;
    return (`
      <button 
        class="button button__${type} button--${color}"
        ${action ? `type="${type}"` : ""}
        ${form ? `form="${form}"` : ""}
      >
        ${label}
      </button>
    `);
  }
}
