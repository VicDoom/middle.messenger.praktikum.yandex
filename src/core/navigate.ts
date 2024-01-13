import { PageList } from "./pages";

export function navigate(page: string) {
  const app = document.getElementById("app");
  
  //@ts-expect-error
  const Component = PageList[page];
  const component = new Component();
  if (!app) return;
  app.innerHTML = "";
  app.append(component.getContent()!);
}
