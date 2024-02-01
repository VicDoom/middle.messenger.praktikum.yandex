import { registerComponent } from "../../core/register-component";
import { AvatarButton, AvatarModal } from "./components";

registerComponent("AvatarModal", AvatarModal);
registerComponent("AvatarButton", AvatarButton);
export { default as ProfilePage } from "./profile";
