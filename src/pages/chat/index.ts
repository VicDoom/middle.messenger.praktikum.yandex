import { registerComponent } from "../../core/register-component";
import { ChatMainPopup } from "./components/chat-main-header/components";
import { CustomButtonWithClick } from "./components/custom-button-with-click";

export { default as ChatPage } from "./chat";

registerComponent("ChatMainPopup", ChatMainPopup);
registerComponent("CustomButtonWithClick", CustomButtonWithClick);
