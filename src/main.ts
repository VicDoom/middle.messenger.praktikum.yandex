import * as Pages from "./pages/index";
import * as Layouts from "./layouts/index";
import * as Components from "./components/index";
import * as ChatComponents from "./pages/chat/components/index";
import { CHAT_ELEMENTS, CURRENT_CHAT } from "./mocks";
import Handlebars from "handlebars";
import { getCroppedText, getTime } from "./helpers";

import iconAdd from "/public/icons/icon-add.svg";
import iconAvatar from "/public/icons/icon-avatar.svg";
import iconBack from "/public/icons/icon-back.svg";
import iconClose from "/public/icons/icon-close.svg";
import iconDelete from "/public/icons/icon-delete.svg";
import iconExpand from "/public/icons/icon-expand.svg";
import iconForward from "/public/icons/icon-forward.svg";
import iconPin from "/public/icons/icon-pin.svg";
import iconSearch from "/public/icons/icon-search.svg";
import iconSend from "/public/icons/icon-send.svg";

const Icons: { [name: string]: string } = {
  "icon-avatar": iconAvatar,
  "icon-add": iconAdd,
  "icon-back": iconBack,
  "icon-close": iconClose,
  "icon-delete": iconDelete,
  "icon-expand": iconExpand,
  "icon-forward": iconForward,
  "icon-pin": iconPin,
  "icon-search": iconSearch,
  "icon-send": iconSend,
};

Object.entries({ ...Layouts, ...Components, ...ChatComponents }).forEach(([name, component]) => {
  Handlebars.registerPartial(name, component);
});

Handlebars.registerHelper("defaultValue", function (value: string, defaultValue: string) {
  var out = value || defaultValue;
  return new Handlebars.SafeString(out);
});

Handlebars.registerHelper("ifEquals", function(arg1: string, arg2: string, options: any) {
  //@ts-expect-error
  return (arg1 == arg2) ? options.fn(this) : options.inverse(this);
});

Handlebars.registerHelper("ifNotEqual", function(arg1: string, arg2: string, options: any) {
  //@ts-expect-error
  return (arg1 != arg2) ? options.fn(this) : options.inverse(this);
});

Handlebars.registerHelper("icons", function(arg: string) {
  return Icons[arg];
});

interface IPageList {
  [key: string]: { source: string, context?: string | object }
}

const PageList: IPageList = {
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

function navigate(page: string) {
  const { source, context } = PageList[page];
  const container = document.getElementById("app");
  if (!container) return;
  container.innerHTML = Handlebars.compile(source)(context);
}

document.addEventListener("DOMContentLoaded", () => navigate("profile"));

document.addEventListener("click", (e) => {
  //@ts-expect-error
  const page = e.target?.getAttribute("page");
  if (page) {
    navigate(page);
    e.preventDefault();
    e.stopImmediatePropagation();
  }
});
