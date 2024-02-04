import { Block, IProps } from "../../../../core/Block";
import { SelectedChat } from "../../../../types";
import connect from "../../../../utils/connect";

interface IChatMainHeaderProps extends IProps {
  title: string
}

export class ChatMainHeader extends Block<IChatMainHeaderProps> {
  constructor(props: IChatMainHeaderProps) {
    super(props);
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
            <div 
                class="chat-main-header__control-wrapper"
                onclick="getElementById('popup-change-lobby').classList.toggle('popup--opened')"
            >
                {{{ ChatControl 
                    style="chat-main-header__expand"
                    icon-name="icon-expand"
                }}}
            </div>
        </div>
      </div>
    `);
  }
}

// export default connect(({ selectedChat }) => ({ selectedChat }))(ChatMainHeader);

// {{#> Popup id="popup-change-lobby" position="bottom-left"}}
//             <div 
//                 class="popup-change-lobby__control"
//                 onclick="getElementById('modal-add-user').classList.toggle('modal--opened')"
//             >
//                 <img src={{icons "icon-add"}} alt="add">
//                 <span>Добавить пользователя</span>
//             </div>
//             <div 
//                 class="popup-change-lobby__control"
//                 onclick="getElementById('modal-delete-user').classList.toggle('modal--opened')"
//             >
//                 <img src={{icons "icon-delete"}} alt="delete">
//                 <span>Удалить пользователя</span>
//             </div>
//         {{/ Popup}}
