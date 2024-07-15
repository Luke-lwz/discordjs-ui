import {
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
  function navigate(pathname: string, options: NavigateOptions = {}) {
    const { ButtonBuilder } = getBuilders(prefix, buttonCache, pathname);

    if (options.blank) {
      // open in new tab
      return;
    }

    pathname = getNewPathNameWithSearchParams(pathname, options?.searchParams);

    const { uiFn, routeName, params, searchParams, cleanPathname } =
      getUIFnAndRouteNameAndParams(pathname, routes);

    const { render, deferRender } = createUIRender(interaction);

    if (uiFn?.route === "ui") {
      const props: NavigatePropsProps = {
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
      uiFn?.component?.(props);

      return;
    }

    if (uiFn?.route === "route") {
      const props: NavigateRouteProps = {
        navigate,
        pathname: cleanPathname || null,
        route: routeName,
        params,
        searchParams,
        globalMetadata,
      };
      uiFn?.component?.(props);

    }
  }

  return {
    navigate,
  };
}

interface GetUIFnAndRouteNameAndParamsReturns {
  uiFn?: RouteTree;
  routeName?: string;
  params?: any;
  searchParams?: any;
  cleanPathname?: string;
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
          i = currentRouteTree.length;
        }
        if (/\[.*\]/g.test(route.route)) {
          const param = route.route.replace("[", "").replace("]", "");
          params[param] = decodeURI(part);
          routeName += `/:${part}`;

          //
          currentRouteTree = route.children;
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

  const uiFn = currentRouteTree.find((r) => r.isDirectory === false);



  if (notFound || !uiFn) {
    console.log("Route not found (" + pathname + ")");

    // 404 Embed 🚨

    return {};
  }

  // call function with this object

  if (!(typeof uiFn.component === "function")) {
    console.error("Component is not a function (" + pathname + ")");
    return {};
  }

  return {
    uiFn,
    routeName,
    params,
    searchParams,
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
