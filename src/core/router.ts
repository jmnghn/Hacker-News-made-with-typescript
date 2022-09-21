import { RouteInfo } from "../types";
import View from "./view";

export default class Router {
  private isStart: boolean;
  private routeTable: RouteInfo[];
  private defaultRoute: RouteInfo | null;

  constructor() {
    window.addEventListener("hashchange", this.route.bind(this));

    this.isStart = false;
    this.routeTable = [];
    this.defaultRoute = null;
  }

  go = (): void => {
    this.route();
  };

  setDefaultPage(page: View, params: RegExp | null = null): void {
    this.defaultRoute = { path: "", page, params };
  }

  addRoutePath(path: string, page: View, params: RegExp | null = null): void {
    this.routeTable.push({ path, page, params });

    if (!this.isStart) {
      this.isStart = true;
      // Execute next tick
      setTimeout(this.route.bind(this), 0);
    }
  }

  private route() {
    const routePath: string = location.hash; // location.hash 에 '#'만 있을 경우, 빈 값('')을 반환함.

    if (routePath === "" && this.defaultRoute) {
      this.defaultRoute.page.render();
      return;
    }

    for (const routeInfo of this.routeTable) {
      if (routePath.indexOf(routeInfo.path) >= 0) {
        if (routeInfo.params) {
          const parserParams = routePath.match(routeInfo.params);

          if (parserParams) {
            routeInfo.page.render.apply(null, [parserParams[1]]);
          }
        } else {
          routeInfo.page.render();
        }
        return;
      }
    }
  }
}
