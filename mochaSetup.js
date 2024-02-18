import { JSDOM } from "jsdom";
import { Components } from "./src/components/index.ts";
import { registerComponent } from "./src/core/register-component.ts";

Object.entries(Components).forEach(
  ([componentName, component]) => registerComponent(componentName, component),
);

// jsdom
const jsdom = new JSDOM("<main></main>", { url: "https://localhost:3000" });

global.window = jsdom.window;
global.document = jsdom.window.document;
global.Node = jsdom.window.Node;
global.MouseEvent = jsdom.window.MouseEvent;
global.XMLHttpRequest = window.XMLHttpRequest;
global.FormData = jsdom.window.FormData;
