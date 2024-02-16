import { Block, IProps } from "../../../../core/Block";
import connect from "../../../../utils/connect";
import { ErrorMessage } from "../../../../components/error-message";
import { Input } from "../../../../components/input";
import { ChatsController } from "../../../../controllers";

interface IChatCreateModalProps extends IProps {
  isOpenCreateChatModal: boolean
  onClose: () => void,
  onSave: (id: number) => void,
}

type TChatCreateModalRefs = {
  error: ErrorMessage,
  inputCreate: Input,
}

class ChatCreateModal extends Block<IChatCreateModalProps, TChatCreateModalRefs> {
  constructor(props: IChatCreateModalProps) {
    super({ 
      ...props,
      onClose: () => window.store.set({ isOpenCreateChatModal: false }),
      onSave: () => {
        const title = this.refs.inputCreate.value();
        if (!title) {
          this.refs.error.setProps({ error: "Название не должно быть пустым" });
          return;
        }
        ChatsController.create(title)
          .catch(error => this.refs.error.setProps({ error }));
      },
    });
  }

  public setError(error: string) {
    this.refs.error.setProps({ error });
  }

  protected render(): string {
    return (`
      {{#Modal id="create-chat-modal" open=isOpenCreateChatModal }}
          <div class="modal__background"></div>
          <div class="modal__content">
              {{{ AvatarModalCloseButton onClose=onClose }}}
              <div class="profile-modal-add-avatar__title">Создайте свой чат!</div>
              {{{ Input ref="inputCreate" label="Название чата" placeholder="" }}}
              {{{ ErrorLine ref="error" error=error }}}
              {{{ Button label="Создать" onClick=onSave }}}
            </div>
          </div>
      {{/ Modal }}
    `);
  }
}

export default connect(
  ({ isOpenCreateChatModal }) => ({ isOpenCreateChatModal }),
)(ChatCreateModal);
