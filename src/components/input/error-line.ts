import { Block, IProps } from "../../core/Block";

export interface ICoreInputProps extends IProps {
  ref: string;
  error: string | boolean;
}

export class ErrorLine extends Block<ICoreInputProps> {
  constructor(props: ICoreInputProps) {
    super({
      ...props,
    });
  };

  protected render(): string {
    return (`
      <label 
        ref="errorLine"
        class="input__helper ${!this.props.error ? "input__helper--disabled" : ""}"
      >
        {{error}}
      </label>
    `);
  };
}
