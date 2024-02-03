import { Block, IProps } from "../../../../core/Block";
import connect from "../../../../utils/connect";

interface IAvatarButtonProps extends IProps {
  avatarHref: string | null;
  events: { click: () => void };
  onClick: () => void;
}

class AvatarButton extends Block<IAvatarButtonProps> {
  constructor(props: IAvatarButtonProps) {
    super(props);
  }

  protected init(): void {
    this.props.events = {
      click: this.props.onClick ?? (() => {}),
    };
  }

  protected render(): string {
    const avatar = this.props.avatarHref ?? "{{icons 'icon-avatar'}}";
    return (`
      <div class="profile-page__avatar-image">
        <img src=${avatar} alt='avatar'>
        <div class="profile-page__avatar-image-text">
          Поменять аватар
        </div>
      </div>
    `);
  }
}

export default connect(({ avatarHref }) => ({ avatarHref }))(AvatarButton);
