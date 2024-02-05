import { Block, IProps } from "../../../../core/Block";
import connect from "../../../../utils/connect";
import { ErrorMessage } from "../../../../components/error-message";
import { Input } from "../../../../components/input";
import { ChatsController } from "../../../../controllers";
import { User } from "../../../../types";

interface IChatDeleteUserModalProps extends IProps {
  isOpenDeleteUserChatModal: boolean
  onClose: () => void,
  onSave: (id: number) => void,
  onKeyUp: (e: KeyboardEvent) => void,
  users: User[],
}

type TChatDeleteUserModalRefs = {
  error: ErrorMessage,
  inputSearch: Input,
}

class ChatDeleteUserModal extends Block<IChatDeleteUserModalProps, TChatDeleteUserModalRefs> {
  constructor(props: IChatDeleteUserModalProps) {
    super({ 
      ...props,
      users: props.users ?? [],
      onClose: () => window.store.set({ isOpenDeleteUserChatModal: false }),
      onSave: (id: number) => {
        const selectedChatId = window.store.getState().selectedChat?.id!;
        ChatsController.deleteUser(id, selectedChatId)
          .then(() => this.setProps({ users: [] }));
      },
    });
  }

  public setError(error: string) {
    this.refs.error.setProps({ error });
  }

  private _getUsersList() {
    const isOpenModal = window.store.getState().isOpenDeleteUserChatModal;
    const users = this.props.users;
    if (isOpenModal && !users.length) {
      const selectedChatId = window.store.getState().selectedChat?.id;
      ChatsController.getUsers(selectedChatId!)
        .then(users => this.setProps({ users }))
        .catch(error => this.refs.error.setProps({ error }));
    }
  }

  protected render(): string {
    this._getUsersList();
    return (`
      {{#Modal id="delete-user-chat-modal" open=isOpenDeleteUserChatModal }}
          <div class="modal__background"></div>
          <div class="modal__content">
              {{{ AvatarModalCloseButton onClose=onClose }}}
              <div class="profile-modal-add-avatar__title">Выберите пользователя, которого хотите удалить</div>
              {{{ ErrorLine ref="error" error=error }}}
              ${this.props.users.map(user => `
                {{{ CustomButtonWithClick id=${user.id} login='${user.login}' onClick=onSave }}}
              `).join("")}
            </div>
          </div>
      {{/ Modal }}
    `);
  }
}

export default connect(
  ({ isOpenDeleteUserChatModal }) => ({ isOpenDeleteUserChatModal }),
)(ChatDeleteUserModal);
