import { Block } from "../../../../core/Block";
import { registerComponent } from "../../../../core/register-component";
import { Validator } from "../../../../helpers";
import { MainControlButton, MainControlInput } from "./components";

registerComponent("MainControlInput", MainControlInput);
registerComponent("MainControlButton", MainControlButton);

type TChatMainControlsRefs = {
  main_control_input: MainControlInput
}

const sendMessage = (message?: string): void => {
  const error = Validator.message(message);
  if (error) {
    console.log(error);
    return;
  }
  console.log(message);
};

export class ChatMainControls extends Block<{}, TChatMainControlsRefs> {
  constructor() {
    super({
      onKeyUp: (event: KeyboardEvent) => { 
        if (event.key === "Enter") {
          const message = this.refs.main_control_input.element?.value;
          sendMessage(message);
        }
      },
      onSubmit: () => {
        const message = this.refs.main_control_input.element?.value;
        sendMessage(message);
      },
    });
  }

  protected render(): string {
    return (`
      <div class="chat-main-controls">
        {{{ ChatControl style="chat-main-controls__pin" icon-name="icon-pin" }}}
        <div class="chat-main-controls__input">
            {{{ MainControlInput ref="main_control_input" onKeyUp=onKeyUp }}}
        </div>
        {{{ MainControlButton ref="main_control_button" onSubmit=onSubmit }}}
      </div>
    `);
  }
}
