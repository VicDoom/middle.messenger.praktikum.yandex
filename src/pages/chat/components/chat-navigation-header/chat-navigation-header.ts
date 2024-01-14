import { Block } from "../../../../core/Block";
import { registerComponent } from "../../../../core/register-component";
import { NavigationInput, NavigationProfile } from "./components";

registerComponent("NavigationInput", NavigationInput);
registerComponent("NavigationProfile", NavigationProfile);

type TChatNavigationHeaderRefs = {
  navigation_input: NavigationInput,
}

export class ChatNavigationHeader extends Block<{}, TChatNavigationHeaderRefs> {
  constructor() {
    super({
      onKeyUp: (event: KeyboardEvent) => { 
        if (event.key === "Enter") {
          console.log(this.refs.navigation_input.element?.value);
        }
      },
    });
  }

  protected render(): string {
    return (`
      <div class="chat-navigation-header">
        <div class="chat-navigation-header__profile">
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
