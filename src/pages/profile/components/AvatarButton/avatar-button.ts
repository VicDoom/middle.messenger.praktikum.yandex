import { Block, IProps } from "../../../../core/Block";

interface IAvatarButtonProps extends IProps {
  events: { click: () => void };
  onClick: () => void;
}

export class AvatarButton extends Block<IAvatarButtonProps> {
  constructor(props: IAvatarButtonProps) {
    super(props);
  }

  protected init(): void {
    this.props.events = {
      click: this.props.onClick ?? (() => {}),
    };
  }

  protected render(): string {
    return (`
      <div class="profile-page__avatar-image">
        <img src={{icons "icon-avatar"}} alt="avatar">
        <div class="profile-page__avatar-image-text">
          Поменять аватар
        </div>
      </div>
    `);
  }
}
