import { Block, IProps } from "../../../../../../core/Block";

interface IChatMainPopupProps extends IProps {
  open: boolean,
  addUserChatModal: () => void,
  deleteUserChatModal: () => void,
}

export class ChatMainPopup extends Block<IChatMainPopupProps> {
  constructor(props: IChatMainPopupProps) {
    super({
      ...props,
      addUserChatModal: () => window.store.set({ isOpenAddUserChatModal: true }),
      deleteUserChatModal: () => window.store.set({ isOpenDeleteUserChatModal: true }),
    });
  }

  protected render(): string {
    return(`
      {{# Popup open=open }}
        {{{ Button label="Добавить участника чата" onClick=addUserChatModal }}}
        {{{ Button label="Удалить участника чата" onClick=deleteUserChatModal }}}
      {{/ Popup}}
    `);
  }
}
