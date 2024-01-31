import { Block } from "../../../../../../core/Block";
import { DEFAULT_PROPS, Router } from "../../../../../../core/Router";

export class NavigationProfile extends Block<{}> {
  constructor() {
    const router = new Router(DEFAULT_PROPS);
    super({
      events: {
        click: () => router.go("/profile"),
      },
    });
  }

  protected render(): string {
    return (`
      <div class="chat-navigation-header__profile-wrapper">
        <span class="chat-navigation-header__profile-label">Профиль</span>
        <img src={{icons "icon-forward"}} alt="forward">
      </div>
    `);
  }
}
