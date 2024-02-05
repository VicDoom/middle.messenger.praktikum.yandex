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
  Page500,
  ProfileEditFieldsPage, 
  ProfileEditPasswordPage, 
  ProfilePage, 
  RegisterPage,
} from "./pages";
import { Store } from "./core/Store";
import { AppState } from "./types";
import { initApp } from "./core/init-app";

declare global {
  interface Window {
    store: Store<AppState>;
  }

  type Nullable<T> = T | null;
}

const initState: AppState = {
  error: null,
  user: null,
  isOpenEditAvatarModal: false,
  isOpenAddUserChatModal: false,
  isOpenDeleteUserChatModal: false,
  isOpenCreateChatModal: false,
  chats: [],
  messages: [],
  selectedChat: null,
  avatarHref: undefined,
};

window.store = new Store<AppState>(initState);

Object.entries({ ...Layouts }).forEach(([name, component]) => {
  Handlebars.registerPartial(name, component);
});

registerComponent("Button", Components.Button);
registerComponent("ButtonBack", Components.ButtonBack);
registerComponent("Divider", Components.Divider);
registerComponent("ErrorMessage", Components.ErrorMessage);
registerComponent("Input", Components.Input);
registerComponent("Modal", Components.Modal);
registerComponent("Popup", Components.Popup);
registerComponent("ChatControl", ChatComponents.ChatControl);
registerComponent("ChatElement", ChatComponents.ChatElement);
registerComponent("ChatList", ChatComponents.ChatList);
registerComponent("ChatNavigationHeader", ChatComponents.ChatNavigationHeader);
registerComponent("ChatMainBody", ChatComponents.ChatMainBody);
registerComponent("ChatMainControls", ChatComponents.ChatMainControls);
registerComponent("ChatMainHeader", ChatComponents.ChatMainHeader);
registerComponent("ChatAddUserModal", ChatComponents.ChatAddUserModal);
registerComponent("ChatDeleteUserModal", ChatComponents.ChatDeleteUserModal);
registerComponent("ChatCreateModal", ChatComponents.ChatCreateModal);

registerHandlebarsHelpers();

document.addEventListener("DOMContentLoaded", () => {
  const router = new Router({ rootQuery: "main", errorRoute: "/page-404" });
  router
    .use("/profile", ProfilePage)
    .use("/settings", ProfileEditFieldsPage)
    .use("/settings-password", ProfileEditPasswordPage)
    .use("/sign-up", RegisterPage)
    .use("/login", LoginPage)
    .use("/page-404", Page404)
    .use("/page-500", Page500)
    .use("/messenger", ChatPage)
    .start()

  initApp();
});
