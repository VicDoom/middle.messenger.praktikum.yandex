import { registerComponent } from "../../core/register-component";
import { AvatarButton, AvatarModal } from "./components";

registerComponent("AvatarModal", AvatarModal);
registerComponent("AvatarButton", AvatarButton);
export { ProfilePage as default } from "./profile";
