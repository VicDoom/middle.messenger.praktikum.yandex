import { Block } from "../../../../../../core/Block";

export class NavigationCreateButton extends Block<{}> {
  constructor() {
    super({
      events: {
        click: () => window.store.set({ isOpenCreateChatModal: true }),
      },
    });
  }

  protected render(): string {
    return (`
      <div class="chat-navigation-header__profile-wrapper">
        <img src={{icons "icon-create"}} alt="create">
      </div>
    `);
  }
}
