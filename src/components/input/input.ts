import { Block } from "../../core/Block";
import { registerComponent } from "../../core/register-component";
import { CoreInput } from "./core-input";
import { ErrorLine } from "./error-line";

registerComponent("CoreInput", CoreInput);
registerComponent("ErrorLine", ErrorLine);

interface IInputProps {
  label: string;
  value: string;
  id: string;
  ref: Element;
  placeholder: string;
  styleType: string;
  disabled: boolean;
  validate: (value: string) => boolean;
  onBlur: () => void;
  events?: { [name: string]: () => void };
}

interface IInputRefs {
  [key: string]: Element | Block<object>
  input: Block<{}, {}, HTMLInputElement>,
  errorLine: Block<{}>,
}

export class Input extends Block<IInputProps, IInputRefs, HTMLInputElement> {
  constructor(props: IInputProps) {
    super({
      ...props,
      onBlur: () => this.validate(),
    });
  }

  public value() {
    if (!this.validate()) {
      return null;
    }
    return this.refs.input.element?.value;
  }

  componentDidMount(): void {
    if (this.refs.input.element) {
      this.refs.input.element.value = this.props.value;
    }
  }

  private validate() {
    const value = this.refs.input.element?.value;
    const error = this.props.validate?.(value ?? "");
    if (error) {
      this.refs.errorLine.setProps({ error });
      return false;
    }
    this.refs.errorLine.setProps({ error: false });
    return true;
  }


  protected render(): string {
    const { label, id, placeholder, disabled, styleType } = this.props;
    const type = styleType || "text";
    return (`
      <div class="input ${disabled ? "input--disabled" : ""} input--${styleType}">
        <label for="${id}" class="input__label">${label}</label>
        {{{ CoreInput
            type="${type}"
            ref="input"
            placeholder="${placeholder}"
            className="input__field {{#if helper-text}} input__field--error{{/if}}"
            name=${id}
            onBlur=onBlur
            disabled=${disabled}
        }}}
        {{{ ErrorLine ref="errorLine" }}}
      </div>
    `);
  }
}
