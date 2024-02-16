import { registerComponent } from "../../core/register-component";
import { AvatarButton, AvatarModal } from "./components";
import { AvatarModalCloseButton } from "./components/AvatarModal/components/index";

export { default as ProfilePage } from "./profile";

registerComponent("AvatarModal", AvatarModal);
registerComponent("AvatarButton", AvatarButton);
registerComponent("AvatarModalCloseButton", AvatarModalCloseButton);
