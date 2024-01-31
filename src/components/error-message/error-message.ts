import { Block, IProps } from "../../core/Block";

interface IErrorMessageProps extends IProps {
  message: string;
}

export class ErrorMessage extends Block<IErrorMessageProps, {}> {
  protected render(): string {
    return (`
      <div class="input__helper">{{error}}</div>
    `);
  }
};
