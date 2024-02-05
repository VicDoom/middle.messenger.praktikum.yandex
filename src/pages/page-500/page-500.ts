import { Block } from "../../core/Block";
import { DEFAULT_PROPS, Router } from "../../core/Router";

export class Page500 extends Block<{}> {
  constructor() {
    const router = new Router(DEFAULT_PROPS);
    super({
      onClick: () => router.go("/messenger"),
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
