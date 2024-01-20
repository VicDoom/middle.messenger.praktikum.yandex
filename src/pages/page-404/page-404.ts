import { Block } from "../../core/Block";
import { navigate } from "../../core/navigate";

export class Page404 extends Block<{}> {
  constructor() {
    super({
      onClick: () => navigate("chat"),
    });
  }

  protected render(): string {
    return (`
      {{#> CenterLayout}}
        <div class="page-info">
          <div class="page-info__title">404</div>
          <div class="page-info__text">Не туда попали</div>
          {{{ Button page='chat' label="Назад к чатам" type="link" onClick=onClick }}}
        </div>
      {{/ CenterLayout}}
    `);
  }
}
