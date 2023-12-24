import * as Pages from "./pages/index";
import * as Layouts from "./layouts/index";
import * as Components from "./components/index";
import * as ChatComponents from "./pages/chat/components/index";
import { CHAT_ELEMENTS, CURRENT_CHAT } from "./mocks";
import Handlebars from "handlebars";
import { getCroppedText, getTime } from "./helpers";

Object.entries({ ...Layouts, ...Components, ...ChatComponents }).forEach(([name, component]) => {
  Handlebars.registerPartial(name, component);
});

Handlebars.registerHelper("defaultValue", function (value, defaultValue) {
  var out = value || defaultValue;
  return new Handlebars.SafeString(out);
});

Handlebars.registerHelper("ifEquals", function(arg1, arg2, options) {
  return (arg1 == arg2) ? options.fn(this) : options.inverse(this);
});

Handlebars.registerHelper("ifNotEqual", function(arg1, arg2, options) {
  return (arg1 != arg2) ? options.fn(this) : options.inverse(this);
});

const PageList = {
  "page404": { source: Pages.Page404, context: "404!!!" },
  "page500": { source: Pages.Page500 },
  "login": { source: Pages.LoginPage },
  "register": { source: Pages.RegisterPage },
  "profile": { 
    source: Pages.ProfilePage, 
    context: { first_name: "Никита", modal_avatar_title: "Загрузите файл", avatar_error: false },
  },
  "profile-edit-fields": { source: Pages.ProfileEditFieldsPage },
  "profile-edit-password": { source: Pages.ProfileEditPasswordPage },
  "chat": { 
    source: Pages.ChatPage, 
    context: { 
      chat_elements: CHAT_ELEMENTS.map(
        (element) => ({ ...element, date: getTime(element.date), message: getCroppedText(element.message) }),
      ), 
      current_chat: {
        ...CURRENT_CHAT, 
        messages: CURRENT_CHAT.messages.map((element) => ({ ...element, date: getTime(element.date) })),
      },
    },
  },
};

function navigate(page) {
  const { source, context } = PageList[page];
  const container = document.getElementById("app");
  if (!container) return;
  container.innerHTML = Handlebars.compile(source)(context);
}

console.log(Layouts);
console.log(Components);
console.log(Pages);
console.log(ChatComponents);
document.addEventListener("DOMContentLoaded", () => navigate("chat"));

document.addEventListener("click", (e) => {
  //@ts-ignore
  const page = e.target?.getAttribute("page");
  if (page) {
    navigate(page);
    e.preventDefault();
    e.stopImmediatePropagation();
  }
});
