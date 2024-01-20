import { Block } from "../../core/Block";

export class Divider extends Block<{}> {
  constructor() {
    super();
  }

  protected render(): string {
    return (`
       <div class="divider"></div>
    `);
  }
};
