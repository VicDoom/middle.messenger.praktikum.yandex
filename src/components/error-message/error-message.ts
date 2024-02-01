import { Block, IProps } from "../../core/Block";

interface IErrorMessageProps extends IProps {
  error: string;
}

export class ErrorMessage extends Block<IErrorMessageProps, {}> {
  constructor(props: IErrorMessageProps) {
    super(props);
  }

  protected render(): string {
    const { error } = this.props;
    return (`
      <div class="input__helper">${error || ""}</div>
    `);
  }
};
