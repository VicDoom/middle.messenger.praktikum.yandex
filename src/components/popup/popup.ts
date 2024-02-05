import { Block, IProps } from "../../core/Block";

interface IPopupProps extends IProps {
  open: boolean;
}

export class Popup extends Block<IPopupProps, {}> {
  constructor(props: IPopupProps) {
    super(props);
  }

  protected render(): string {
    const position = this.props.open ? "popup--bottom-left popup--open" : "";
    return (
      `<div class='popup ${position}'></div>`
    );
  }
}
