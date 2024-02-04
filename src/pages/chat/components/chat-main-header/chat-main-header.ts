import { Popup } from "../../../../components/popup";
import { Block, IProps } from "../../../../core/Block";

interface IChatMainHeaderProps extends IProps {
  title: string,
  handlePopup: () => void,
}

type TChatMainHeaderRefs = {
  popupControls: Popup,
}

export class ChatMainHeader extends Block<IChatMainHeaderProps, TChatMainHeaderRefs> {
  constructor(props: IChatMainHeaderProps) {
    super({
      ...props,
      handlePopup: (() => {
        let isOpen = false;
        return () => {
          this.refs.popupControls.setProps({ open: !isOpen });
          isOpen = !isOpen;
        };
      })(),
    });
  }

  protected render(): string {
    return (`
      <div class="chat-main-header">
        <div class="chat-main-header__profile">
            <div class="chat-main-header__profile-avatar"></div>
            <div class="chat-main-header__profile-name">
              {{ title }}
            </div>
        </div>
        <div class="chat-main-header__controls">
            <div class="chat-main-header__control-wrapper">
                {{{ ChatControl 
                    style="chat-main-header__expand"
                    icon-name="icon-expand"
                    onClick=handlePopup
                }}}
                {{{ ChatMainPopup ref="popupControls" }}}
            </div>
        </div>
      </div>
    `);
  }
}
