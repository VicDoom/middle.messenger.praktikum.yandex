import { Components } from "./components/index";
import * as Layouts from "./layouts/index";
import * as ChatComponents from "./pages/chat/components/index";
import Handlebars from "handlebars";
import { registerHandlebarsHelpers } from "./core/register-handlebars-helpers";
import { navigate } from "./core/navigate";
import { registerComponent } from "./core/register-component";
import HTTPTransport from "./api/index";

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

document.addEventListener("DOMContentLoaded", () => navigate("chat"));
