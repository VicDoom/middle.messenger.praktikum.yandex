import { Button } from "../../../../components/button";
import { ErrorMessage } from "../../../../components/error-message";
import { Block, IProps } from "../../../../core/Block";
import connect from "../../../../utils/connect";

interface IAvatarModalProps extends IProps {
  isOpenEditAvatarModal: boolean
  onClose: () => void,
  onSave: () => void,
}

type TAvatarModalRef = {
  closeButton: Button,
  error: ErrorMessage,
}

class AvatarModal extends Block<IAvatarModalProps, TAvatarModalRef> {
  constructor(props: IAvatarModalProps) {
    super({ ...props });
  }

  public setError(error: string) {
    this.refs.error.setProps({ error });
  }

  protected render(): string {
    return (`
      {{#Modal id="profile-modal-add-avatar" open=isOpenEditAvatarModal }}
          <div class="modal__background"></div>
          <div class="modal__content">
              {{{ AvatarModalCloseButton onClose=onClose }}}
              <div class="profile-modal-add-avatar__title">Загрузите аватар</div>
              <input type="file" id="avatar" name="avatar" accept="image/png, image/jpeg" />
              {{{ ErrorLine ref="error" error=error }}}
              <div "profile-modal-add-avatar__control">
                {{{ Button label="Поменять" page="profile" onClick=onSave }}}
              </div>
            </div>
          </div>
      {{/ Modal }}
    `);
  }
}

export default connect(({ isOpenEditAvatarModal }) => ({ isOpenEditAvatarModal }))(AvatarModal);
