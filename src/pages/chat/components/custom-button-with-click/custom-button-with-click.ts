import { Block, IProps } from "../../../../core/Block";

interface ICustomButtonWithClick extends IProps {
  id: number,
  login: string,
  onClick: (id: number) => void,
}

export class CustomButtonWithClick extends Block<ICustomButtonWithClick> {
  constructor(props: ICustomButtonWithClick) {
    super({
      ...props,
      events: {
        click: () => props.onClick(this.props.id),
      },
    });
  }

  protected render(): string {
    return (`
      {{{ Button label=login }}}
    `);
  }
}
