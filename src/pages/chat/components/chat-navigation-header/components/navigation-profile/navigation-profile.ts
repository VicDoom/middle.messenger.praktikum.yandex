import { Block } from "../../../../../../core/Block";
import { navigate } from "../../../../../../core/navigate";

export class NavigationProfile extends Block<{}> {
  constructor() {
    super({
      events: {
        click: () => navigate("profile"),
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
