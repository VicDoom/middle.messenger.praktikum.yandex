import { Button } from "../../../../components/button";
import { Block, IProps } from "../../../../core/Block";

interface IAvatarModalProps extends IProps {
  ref: Element;
}

type TAvatarModal = {
  closeButton: Button,
}

export class AvatarModal extends Block<IAvatarModalProps, TAvatarModal> {
  constructor(props: IAvatarModalProps) {
    super(props);
  }

  componentDidMount(): void {
    this.hide();
  }

  protected render(): string {
    return (`
      {{#> Modal id="profile-modal-add-avatar" ref="changeAvatarModal" }}
          <div class="profile-modal-add-avatar__title">Загрузите файл</div>
          {{{ Button label="Выбрать файл на компьютере" type="link" }}}
          <div "profile-modal-add-avatar__control">
            {{{ Button label="Поменять" page="profile" }}}
            {{#if avatar_error}}
              <div class="profile-modal-add-avatar__error">
                Нужно выбрать файл
              </div>
            {{/if}}
          </div>
      {{/ Modal }}
    `);
  }
}
