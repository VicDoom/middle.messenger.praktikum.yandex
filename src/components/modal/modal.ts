import { Block, IProps } from "../../core/Block";

interface Props extends IProps {
  open: boolean,
  onClose: () => void
}

export class Modal extends Block<Props, {}> {
  constructor(props: Props) {
    super(props);
  };

  protected render(): string {
    return (`
        <div id={{id}} class='modal ${this.props.open ? "modal--opened": ""}'></div>
    `);
  }
};
