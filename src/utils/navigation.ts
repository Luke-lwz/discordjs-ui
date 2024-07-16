import checkFailPage from "../default-pages/checkFail";
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

import { getBuilders } from "./componentBuilders";
import { createUIRender } from "./uiRender";

export default function createNavigation(
  routes: RouteTree[],
  interaction: any,
  globalMetadata: any,
  messageDefault?: UIMessageOptional,
  prefix: string = "ui",
  buttonCache?: any
) {
  async function navigate(pathname: string, options: NavigateOptions = {}) {
    const { ButtonBuilder } = getBuilders(prefix, buttonCache, pathname);

    if (options.blank) {
      // open in new tab
      return;
    }

    pathname = getNewPathNameWithSearchParams(pathname, options?.searchParams);

    const {
      uiRoute,
      errorRoute,
      checkFailRoute,
      checkRoutes,
      notFoundRoute,
      loadingRoute,
      routeName,
      params,
      searchParams,
      cleanPathname,
      notFound,
    } = getUIFnAndRouteNameAndParams(pathname, routes);

    const { render, deferRender } = createUIRender(interaction);

    const defaultProps: NavigatePropsProps = {
      interaction: interaction,
      navigate,
      pathname: cleanPathname || null,
      route: routeName,
      params,
      searchParams,
      globalMetadata,
      ButtonBuilder,
      render,
      deferRender,
    };


    try {
      if (loadingRoute) {
        const loadingReturn = await loadingRoute?.component?.(defaultProps);
        if (loadingReturn) render(loadingReturn);
      }

      if (notFound) {
        const notFoundReturn = await notFoundRoute?.component?.(defaultProps);
        if (notFoundReturn) render(notFoundReturn);
        return;
      }

      // go thru checks
      for (let i = 0; i < checkRoutes.length; i++) {
        const checkRoute = checkRoutes[i];
        if (!checkRoute.component) continue;
        const checkResult = checkRoute.component(defaultProps);
        if (!checkResult) {
          const checkFailReturn = await checkFailRoute?.component?.(
            defaultProps
          );
          if (checkFailReturn) render(checkFailReturn);
          return;
        }
      }

      if (uiRoute?.route === "ui") {
        const uiReturn = await uiRoute?.component?.(defaultProps);
        if (uiReturn) render(uiReturn);
        return;
      }
    } catch (e) {
      console.log(e.message);
      const errorReturn = await errorRoute?.component?.(defaultProps);
      if (errorReturn) render(errorReturn);
      return;
    }
  }

  return {
    navigate,
  };
}

interface GetUIFnAndRouteNameAndParamsReturns {
  uiRoute?: RouteTree;
  errorRoute?: RouteTree;
  notFoundRoute?: RouteTree;
  checkRoutes?: RouteTree[];
  checkFailRoute?: RouteTree;
  loadingRoute?: RouteTree;
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

  let loadingRoute: RouteTree = null;

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

  let checkRoutes: RouteTree[] = [];
  let checkFailRoute: RouteTree = {
    route: "checkFail",
    component: checkFailPage,
    children: [],
    isDirectory: false,
  };

  function searchForAndUpdatePageRoutes(currentRouteTree: RouteTree[]) {
    currentRouteTree.forEach((route: RouteTree) => {
      if (route.isDirectory) return;
      if (route.route === "error") {
        errorRoute = route;
      } else if (route.route === "notFound") {
        notFoundRoute = route;
      } else if (route.route === "checkFail") {
        checkFailRoute = route;
      } else if (route.route === "check") {
        checkRoutes.push(route);
      } else if (route.route === "ui") {
        uiRoute = route;
      } else if (route.route === "loading") {
        loadingRoute = route;
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
    checkRoutes,
    checkFailRoute,
    loadingRoute,
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
