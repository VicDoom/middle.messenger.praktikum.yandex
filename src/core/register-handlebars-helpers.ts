import Handlebars from "handlebars";

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
import iconCreate from "/public/icons/icon-create.svg";

export const registerHandlebarsHelpers = () => {
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
    "icon-create": iconCreate,
  };

  Handlebars.registerHelper("defaultValue", function (value: string, defaultValue: string) {
    var out = value || defaultValue;
    return new Handlebars.SafeString(out);
  });
      
  Handlebars.registerHelper("ifEquals", (arg1: string, arg2: string, options) => {
    return (arg1 == arg2) ? options.fn(this) : options.inverse(this);
  });
      
  Handlebars.registerHelper("ifNotEqual", (arg1: string, arg2: string, options) => {
    return (arg1 != arg2) ? options.fn(this) : options.inverse(this);
  });
      
  Handlebars.registerHelper("icons", function(arg: string) {
    return Icons[arg];
  });
};
