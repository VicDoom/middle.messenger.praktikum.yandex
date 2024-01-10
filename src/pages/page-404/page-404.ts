import { Block } from "../../core/Block";

export class Page404 extends Block<{}> {
  constructor() {
    super();
  }

  protected render(): string {
    return (`
      {{#> CenterLayout}}
        <div class="page-info">
          <div class="page-info__title">404</div>
          <div class="page-info__text">Не туда попали</div>
          {{{ Button page='chat' label="Назад к чатам" type="link" page="chat" }}}
        </div>
      {{/ CenterLayout}}
    `);
  }
}
