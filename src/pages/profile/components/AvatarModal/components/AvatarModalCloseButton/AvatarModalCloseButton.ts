import { Block, IProps } from "../../../../../../core/Block";

interface IAvatarModalCloseButtonProps extends IProps {
  onClose: () => void,
}

export class AvatarModalCloseButton extends Block<IAvatarModalCloseButtonProps, {}> {
  constructor(props: IAvatarModalCloseButtonProps) {
    super({
      ...props,
      events: {
        click: props.onClose,
      },
    });
  }

  protected render(): string {
    return (`
      <div class="modal__close">
        <img src={{icons "icon-close"}} alt="close">
      </div>
    `);
  }
};
