import { ChatsController } from "../../../../controllers";
import { Block } from "../../../../core/Block";
import { registerComponent } from "../../../../core/register-component";
import { NavigationCreateButton, NavigationInput, NavigationProfile } from "./components";

registerComponent("NavigationInput", NavigationInput);
registerComponent("NavigationProfile", NavigationProfile);
registerComponent("NavigationCreateButton", NavigationCreateButton);

type TChatNavigationHeaderRefs = {
  navigation_input: NavigationInput,
}

export class ChatNavigationHeader extends Block<{}, TChatNavigationHeaderRefs> {
  constructor() {
    super({
      onKeyUp: (event: KeyboardEvent) => { 
        if (event.key === "Enter") {
          ChatsController.getChats(
            this.refs.navigation_input.element?.value,
          ).then(chats => window.store.set({ chats }));
        }
      },
    });
  }

  protected render(): string {
    return (`
      <div class="chat-navigation-header">
        <div class="chat-navigation-header__profile">
          {{{ NavigationCreateButton }}}
          {{{ NavigationProfile }}}
        </div>
        <div class="chat-navigation-search-wrapper">
            {{{ NavigationInput ref="navigation_input" onKeyUp=onKeyUp }}}
            <label for="chat-navigation-search" class="chat-navigation-search-label">
                <img src={{icons "icon-search"}} alt="search">
                <span class="chat-navigation-search-label__text">Поиск</span>
            </label>
        </div>
      </div>
    `);
  }
}
