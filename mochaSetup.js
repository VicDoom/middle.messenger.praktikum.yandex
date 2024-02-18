import { JSDOM } from "jsdom";
import { Components } from "./src/components/index.ts";
import { registerComponent } from "./src/core/register-component.ts";

Object.entries(Components).forEach(
  ([componentName, component]) => registerComponent(componentName, component)
)

// jsdom
const jsdom = new JSDOM(`<body></body>`);

global.window = jsdom.window;
global.document = jsdom.window.document;
global.Node = jsdom.window.Node;
global.MouseEvent = jsdom.window.MouseEvent;
