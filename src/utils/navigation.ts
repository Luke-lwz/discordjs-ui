import gateErrorPage from "../default-pages/gateError";
import errorPage from "../default-pages/error";
import notFoundPage from "../default-pages/notFound";
import {
  NavigateCheckProps,
  NavigateOptions,
  NavigatePropsProps,
  NavigateRouteProps,
  RouteTree,
  UIMessageOptional,
} from "../types";



interface GetUIFnAndRouteNameAndParamsReturns {
  uiRoute?: RouteTree;
  errorRoute?: RouteTree;
  notFoundRoute?: RouteTree;
  gateRoutes?: RouteTree[];
  messageLayoutRoutes?: RouteTree[];
  contextRoutes?: RouteTree[];
  routeName?: string;
  params?: any;
  searchParams?: any;
  cleanPathname?: string;
  notFound?: boolean;
}

export function getUIFnAndRouteNameAndParams(
  pathname: string,
  routes: RouteTree[]
): GetUIFnAndRouteNameAndParamsReturns | undefined {
  const params = {};
  let routeName = "/";

  const url = new URL("https://lol.lol" + decodeURI(pathname));

  pathname = url.pathname;

  const searchParams = {};

  url.searchParams.forEach((value, key) => {
    searchParams[key] = value;
  });

  var currentRouteTree = routes;

  const pathnameSplit = pathname.split("/");
  if (pathnameSplit[0] === "") pathnameSplit.shift();

  let notFound = false;

  let uiRoute: RouteTree = null;

  let errorRoute: RouteTree = {
    route: "error",
    component: errorPage,
    children: [],
    isDirectory: false,
  };
  let notFoundRoute: RouteTree = {
    route: "notFound",
    component: notFoundPage,
    children: [],
    isDirectory: false,
  };

  let gateRoutes: RouteTree[] = [];

  let messageLayoutRoutes: RouteTree[] = [];

  let contextRoutes: RouteTree[] = [];

  function searchForAndUpdatePageRoutes(currentRouteTree: RouteTree[]) {
    currentRouteTree.forEach((route: RouteTree) => {
      if (route.isDirectory) return;
      if (route.route === "error") {
        errorRoute = route;
      } else if (route.route === "notFound") {
        notFoundRoute = route;
      } else if (route.route === "gate") {
        gateRoutes.push(route);
      } else if (route.route === "messageLayout") {
        messageLayoutRoutes.push(route);
      } else if (route.route === "context") {
        contextRoutes.push(route);
      } else if (route.route === "ui") {
        uiRoute = route;
      }
    });
  }

  searchForAndUpdatePageRoutes(currentRouteTree);
  pathnameSplit.forEach((part, index) => {
    if (notFound) return;
    let directoryFound = false;
    for (let i = 0; i < currentRouteTree.length; i++) {
      const route = currentRouteTree[i];

      if (route.isDirectory) {
        if (route.route === part) {
          routeName += `/${part}`;

          //
          currentRouteTree = route.children;
          searchForAndUpdatePageRoutes(currentRouteTree);

          directoryFound = true;
          return true;
        }
        if (/\[\.\.\..*\]/g.test(route.route)) {
          const param = route.route
            .replace("[", "")
            .replace(".", "")
            .replace(".", "")
            .replace(".", "")
            .replace("]", "");
          params[param] = pathnameSplit.slice(index).join("/");
          routeName += `/:...${param}`;
          searchForAndUpdatePageRoutes(route.children);

          i = currentRouteTree.length;
        }
        if (/\[.*\]/g.test(route.route)) {
          const param = route.route.replace("[", "").replace("]", "");
          params[param] = decodeURI(part);
          routeName += `/:${part}`;

          //
          currentRouteTree = route.children;
          searchForAndUpdatePageRoutes(currentRouteTree);
          directoryFound = true;
          return true;
        }
      }
    }

    if (!directoryFound) {
      notFound = true;
      return;
    }
  });

  if (notFound || !uiRoute) {
    console.log("Route not found (" + pathname + ")");

    notFound = true;

    // 404 Embed 🚨
  }

  // call function with this object

  if (!(typeof uiRoute?.component === "function")) {
    console.error("Component is not a function (" + pathname + ")");
    notFound = true;
  }

  return {
    uiRoute,
    errorRoute,
    notFoundRoute,
    gateRoutes,
    messageLayoutRoutes,
    contextRoutes,
    routeName,
    params,
    searchParams,
    notFound,
    cleanPathname: decodeURI(pathname),
  };
}

export function getNewPathNameWithSearchParams(
  pathname: string,
  searchParams?: { [key: string]: string }
) {
  if (!searchParams) return pathname;

  const url = new URL("https://lol.lol" + decodeURI(pathname));

  url.search = new URLSearchParams(searchParams).toString();

  return url.pathname + url.search;
}
