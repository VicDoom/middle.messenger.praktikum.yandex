import Handlebars from "handlebars";
// import { Link } from "./link";
import { Input } from "./input";
import { Button } from "./button";
import { Divider } from "./divider";
import { ButtonBack } from "./button-back";
import { Modal } from "./modal";
// import { Popup } from "./popup";
import { ErrorMessage } from "./error-message";

// Некоторые компоненты были оставлены в форме Partials
Handlebars.registerPartial("Modal", Modal);

export const Components = {
  Button,
  ButtonBack,
  Divider,
  ErrorMessage,
  Input,
};
