import { Block, IProps } from "../../../../../../core/Block";

interface INavigationInput extends IProps {
  ref: string;
  onKeyUp: (event: Event | KeyboardEvent) => void;
}

type TNavigationInputRefs = {
  navigation_input: Block<{}, {}, HTMLInputElement>,
}

export class NavigationInput extends Block<INavigationInput, TNavigationInputRefs, HTMLInputElement> {
  constructor(props: INavigationInput) {
    super({
      ...props,
      events: {
        keyup: props.onKeyUp,
      },
    });
  }

  protected render(): string {
    return (`
      <input
        id="chat-navigation-search" 
        type="text" 
        class="chat-navigation-search-input" 
      />
    `);
  }
}
