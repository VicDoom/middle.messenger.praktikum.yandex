import { Components } from "./components/index";
import * as Layouts from "./layouts/index";
import * as ChatComponents from "./pages/chat/components/index";
import Handlebars from "handlebars";
import { registerHandlebarsHelpers } from "./core/register-handlebars-helpers";
import { registerComponent } from "./core/register-component";
import { Router } from "./core/Router";
import { 
  ChatPage, 
  LoginPage, 
  Page404, 
  ProfileEditFieldsPage, 
  ProfileEditPasswordPage, 
  ProfilePage, 
  RegisterPage,
} from "./pages";
import page500 from "./pages/page-500";

Object.entries({ ...Layouts }).forEach(([name, component]) => {
  Handlebars.registerPartial(name, component);
});

registerComponent("Button", Components.Button);
registerComponent("ButtonBack", Components.ButtonBack);
registerComponent("Divider", Components.Divider);
registerComponent("Input", Components.Input);
registerComponent("ChatControl", ChatComponents.ChatControl);
registerComponent("ChatElement", ChatComponents.ChatElement);
registerComponent("ChatList", ChatComponents.ChatList);
registerComponent("ChatNavigationHeader", ChatComponents.ChatNavigationHeader);
registerComponent("ChatMainBody", ChatComponents.ChatMainBody);
registerComponent("ChatMainControls", ChatComponents.ChatMainControls);
registerComponent("ChatMainHeader", ChatComponents.ChatMainHeader);

registerHandlebarsHelpers();

document.addEventListener("DOMContentLoaded", () => {
  const router = new Router({ rootQuery: "main" });
  router
    .use("/profile", ProfilePage)
    .use("/profile/edit-fields", ProfileEditFieldsPage)
    .use("/profile/edit-password", ProfileEditPasswordPage)
    .use("/register", RegisterPage)
    .use("/login", LoginPage)
    .use("/page-404", Page404)
    .use("/page-500", page500)
    .use("/chats", ChatPage)
    .start();
  router.go("/profile");
});
