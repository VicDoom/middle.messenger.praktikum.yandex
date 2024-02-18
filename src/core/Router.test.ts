import { Block, RefType } from "./Block";
import { Router } from "./Router";
import { expect } from "chai";
import sinon from "sinon";
import { LOCALHOST_HREF } from "../utils/constants";

describe("Router", () => {
  let TestRouter: Router<RefType, Block<{}, RefType, HTMLElement>>;
  const clock = sinon.useFakeTimers();

  before(() => {
    const router = new Router({ rootQuery: "main", errorRoute: "/error" });
    class DefaultPage extends Block<{}, {}> {
      protected render(): string {
        return "<div id='default-page'></div>";
      }
    }
    class HomePage extends Block<{}, {}> {
      protected render(): string {
        return "<div id='home-page'></div>";
      }
    }
    class ErrorPage extends Block<{}, {}> {
      protected render(): string {
        return "<div id='error-page'></div>";
      }
    }
    router
      .use("/", DefaultPage)
      .use("/home", HomePage)
      .use("/error", ErrorPage)
      .start();
    
    TestRouter = router;
  });

  beforeEach(() => {
    window.location.assign("");
    clock.restore();
  });

  it("Router change pathname", () => {
    const expectedHref = `${LOCALHOST_HREF}/`;
    TestRouter.go("/");
    
    const currentPathname = window.location.href;
    expect(currentPathname).to.be.eq(expectedHref);
  });

  it("Router change history", () => {
    const historyBefore = window.history.length;
    TestRouter.go("/home");
    const historyAfter = window.history.length;

    expect(historyAfter).to.be.eq(historyBefore + 1);
  });

  it("Router navigate back", () => {
    TestRouter.go("/");
    clock.next();
    TestRouter.go("/home");
    clock.next();
    TestRouter.back();
    clock.next();

    const expectedPathname = "/home";

    expect(window.location.pathname).to.be.eq(expectedPathname);
  });

  it("Router navigate forward", () => {
    TestRouter.go("/home");
    clock.next();
    TestRouter.back();
    clock.next();
    TestRouter.forward();
    clock.next();

    const expectedPathname = "/home";

    expect(window.location.pathname).to.be.eq(expectedPathname);
  });

  it("Render Route after Router go", () => {
    TestRouter.go("/home");
    clock.next();

    const element = document.body.querySelector("#home-page");
    expect(element).to.be.not.null;

    const nullElement = document.body.querySelector("default-page");
    expect(nullElement).to.be.null;
  });
});
