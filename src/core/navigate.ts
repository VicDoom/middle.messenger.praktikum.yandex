import { PageList } from "./pages";

export function navigate(page: string) {
  const app = document.getElementsByTagName("main")[0];
  
  //@ts-expect-error different type of pages (TODO: fix that)
  const Component = PageList[page];
  const component = new Component();
  if (!app) return;
  app.innerHTML = "";
  app.append(component.getContent()!);
}
