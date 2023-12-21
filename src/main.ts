import * as Pages from "./pages/index";
import * as Layouts from "./layouts/index";
import * as Components from "./components/index";
import Handlebars from "handlebars";

Object.entries({ ...Layouts, ...Components }).forEach(([name, component]) => {
  Handlebars.registerPartial(name, component);
})

const PageList = {
  "page404": { source: Pages.Page404, context: "404!!!" },
  "page500": { source: Pages.Page500 },
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
document.addEventListener("DOMContentLoaded", () => navigate("page500"));
