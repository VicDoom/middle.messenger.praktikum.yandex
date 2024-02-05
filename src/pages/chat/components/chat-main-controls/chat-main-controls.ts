import { Block, IProps } from "../../../../core/Block";
import { registerComponent } from "../../../../core/register-component";
import { Validator } from "../../../../helpers";
import { MainControlButton, MainControlInput } from "./components";

registerComponent("MainControlInput", MainControlInput);
registerComponent("MainControlButton", MainControlButton);

interface IChatMainControlsProps extends IProps {
  sendMessage: (message: string) => void,
  onKeyUp: (event: KeyboardEvent) => void,
  onSubmit: () => void,
}

type TChatMainControlsRefs = {
  main_control_input: MainControlInput
}

export class ChatMainControls extends Block<IChatMainControlsProps, TChatMainControlsRefs> {
  constructor(props: IChatMainControlsProps) {
    super({
      ...props,
      onKeyUp: (event: KeyboardEvent) => { 
        if (event.key === "Enter") {
          this._sendMessage();
        }
      },
      onSubmit: () => this._sendMessage(),
    });
  }

  private _sendMessage = (): void => {
    const message = this.refs.main_control_input.element?.value;
    const sendCallback = this.props.sendMessage;
    const error = Validator.message(message);
    if (error) {
      console.log(error);
      return;
    }
    sendCallback(message ?? "");
    this.refs.main_control_input.resetValue();
  };

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
