import { Block, IProps } from "../../../../core/Block";
import connect from "../../../../utils/connect";
import { ErrorMessage } from "../../../../components/error-message";
import { Input } from "../../../../components/input";
import { ChatsController, UserController } from "../../../../controllers";
import { User } from "../../../../types";

interface IChatAddUserModalProps extends IProps {
  isOpenAddUserChatModal: boolean
  onClose: () => void,
  onSave: (id: number) => void,
  onKeyUp: (e: KeyboardEvent) => void,
  users: User[],
}

type TChatAddUserModalRefs = {
  error: ErrorMessage,
  inputSearch: Input,
}

class ChatAddUserModal extends Block<IChatAddUserModalProps, TChatAddUserModalRefs> {
  constructor(props: IChatAddUserModalProps) {
    super({ 
      ...props,
      users: props.users ?? [],
      onClose: () => window.store.set({ isOpenAddUserChatModal: false }),
      onKeyUp: (event: KeyboardEvent) => { 
        if (event.key === "Enter") {
          UserController.search(this.refs.inputSearch.value() ?? "")
            .then(users => {
              this.setProps({ users });
              if (!users.length) {
                this.refs.error.setProps({ error: "Пользователь не найден" });
              }
            })
            .catch(error => this.refs.error.setProps({ error }));
        }
      },
      onSave: (id: number) => {
        const selectedChatId = window.store.getState().selectedChat?.id!;
        ChatsController.addUser(id, selectedChatId)
          .then(() => this.setProps({ users: [] }));;
      },
    });
  }

  public setError(error: string) {
    this.refs.error.setProps({ error });
  }

  protected render(): string {
    return (`
      {{#Modal id="add-user-chat-modal" open=isOpenAddUserChatModal }}
          <div class="modal__background"></div>
          <div class="modal__content">
              {{{ AvatarModalCloseButton onClose=onClose }}}
              <div class="profile-modal-add-avatar__title">Выберите нового пользователя</div>
              {{{ Input ref="inputSearch" onKeyUp=onKeyUp label="Логин пользователя" placeholder="" }}}
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

export default connect(({ isOpenAddUserChatModal }) => ({ isOpenAddUserChatModal }))(ChatAddUserModal);
