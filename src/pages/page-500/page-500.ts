import { Block } from "../../core/Block";
import { navigate } from "../../core/navigate";

export class Page500 extends Block<{}> {
  constructor() {
    super({
      onClick: () => navigate("page404"),
    });
  }

  protected render(): string {
    return (`
      {{#> CenterLayout}}
        <div class="page-info">
          <div class="page-info__title">500</div>
          <div class="page-info__text">Мы уже фиксим</div>
          {{{ Button label="Назад к чатам" type="link" onClick=onClick }}}
        </div>
      {{/ CenterLayout}}
    `);
  }
}
