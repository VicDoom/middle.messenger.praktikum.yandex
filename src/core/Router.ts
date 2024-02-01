import { isEqual, render } from "../helpers";
import { Block, RefType } from "./Block";

interface IRouter {
  rootQuery: string;
}

interface IRoute extends IRouter {};

export class Route<R extends RefType, B extends Block<{}, R>> {
  private _pathname: string;
  private _blockClass: {new (...args: any): B};
  private _block: B | null;
  private _props: IRoute;

  constructor(pathname: string, view: {new (...args: any): B}, props: IRoute) {
    this._pathname = pathname;
    this._blockClass = view;
    this._block = null;
    this._props = props;
  }

  navigate(pathname: string) {
    if (this.match(pathname)) {
      this._pathname = pathname;
      this.render();
    }
  }

  leave() {
    if (this._block) {
      this._block.hide();
      this._block.componentWillUnmount();
    }
  }

  match(pathname: string) {
    return isEqual(pathname, this._pathname);
  }

  render() {
    if (!this._block) {
      this._block = new this._blockClass();
      render(this._props.rootQuery, this._block);
      return;
    }
    
    this._block.show();
  }
}

export const DEFAULT_PROPS = {
  rootQuery: "main",
};

export class Router<R extends RefType, B extends Block<{}, R>> {
  private _rootQuery!: string;
  // @ts-expect-error для реализации сингтона нужно задать статичное значение с передаваемыми типами 
  // (ts запрещает такие значения)
  static __instance: Router<R, B>;
  private _currentRoute!: Route<R, B> | null;
  public routes!: Route<R, B>[];
  public history!: History;

  constructor(props?: IRouter) {
    if (!props) {
      props = DEFAULT_PROPS;
    }
    const { rootQuery } = props;

    if (Router.__instance) {
      return Router.__instance;
    }
      
    this.routes = [];
    this.history = window.history;
    this._currentRoute = null;
    this._rootQuery = rootQuery;

    Router.__instance = this;
  }

  use(pathname: string, block: {new (...args: any): B}) {
    const route = new Route<R, B>(pathname, block, { rootQuery: this._rootQuery });
    this.routes.push(route);
    return this;
  }

  start() {
    window.onpopstate = (event: PopStateEvent) => {
      // @ts-expect-error в PopStateEvent содержится pathname, ошибка ts
      this._onRoute(event.currentTarget?.location.pathname);
    };
    this._onRoute(window.location.pathname);
  }

  _onRoute(pathname: string) {
    const route = this.getRoute(pathname);

    if (this._currentRoute) {
      this._currentRoute.leave();
    }

    if (route) {
      this._currentRoute = route;
      route.render();
    }
  }

  go(pathname: string) {
    this.history.pushState({}, "", pathname);
    this._onRoute(pathname);
  }

  back() {
    this.history.back();
  }

  forward() {
    this.history.forward();
  }

  getRoute(pathname: string) {
    return this.routes.find((route) => route.match(pathname));
  }
}
