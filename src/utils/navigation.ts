import { RouteTree, UIMessageOptional } from "../types";

import { v4 as uuidv4 } from "uuid";

import { LocalStorage } from "node-localstorage";
import { ARGS_DIVIDER } from "./CONSTANTS";
import * as path from "path";
import { getBuilders } from "./componentBuilders";

export interface NavigatePropsProps {
  interaction: any;
  navigate: (pathname: string) => void;
  pathname: string;
  route: string;
  globalMetadata: any;
  UIButtonBuilder: any;
}

export interface NavigateOptions {
  blank?: boolean;
}

export default function createNavigation(
  routes: RouteTree[],
  interaction: any,
  globalMetadata: any,
  messageDefault?: UIMessageOptional,
  prefix: string = "ui",
  buttonCache?: any
) {
  function navigate(pathname: string, options: NavigateOptions = {}) {
    const { UIButtonBuilder } = getBuilders(prefix, buttonCache, pathname);

    if (options.blank) {
      // open in new tab
      return;
    }

    const params = {};
    let routeName = "/";

    var currentRouteTree = routes;

    const pathnameSplit = pathname.split("/");

    let notFound = false;

    pathnameSplit.forEach((part, index) => {
      if (notFound) return;
      let directoryFound = false;
      for (let i = 0; i < currentRouteTree.length; i++) {
        const route = currentRouteTree[i];

        if (route.isDirectory) {
          if (/\[.*\]/g.test(route.route)) {
            const param = route.route.replace("[", "").replace("]", "");
            params[param] = part;
            routeName += `/:${part}`;

            //
            currentRouteTree = route.children;
            directoryFound = true;
            return true;
          }
          if (route.route === part) {
            routeName += `/${part}`;

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

    const uiFn = currentRouteTree.find((r) => r.route === "ui");

    if (notFound || !uiFn) {
      console.log("Route not found (" + pathname + ")");

      // 404 Embed 🚨

      return;
    }

    // call function with this object

    if (!(typeof uiFn.component === "function")) {
      console.error("Component is not a function (" + pathname + ")");
      return;
    }

    const props: NavigatePropsProps = {
      interaction: interaction,
      navigate,
      pathname,
      route: routeName,
      globalMetadata,
      UIButtonBuilder,
    };

    uiFn?.component?.(props);
  }

  return {
    navigate,
  };
}

const maxLength = 100;

const uuidLocalStorage = new LocalStorage(
  "./discordjs-ui/localStorage/routes/uuid"
);
const routeLocalStorage = new LocalStorage(
  "./discordjs-ui/localStorage/routes/route"
);

export function encodeRoute(route: string, prefix: string) {
  // ui>n>r>/profile/123482938747191284
  let btnId = `${prefix}${ARGS_DIVIDER}n${ARGS_DIVIDER}r${ARGS_DIVIDER}${route}`;
  if (btnId.length > maxLength) {
    // use cache
    const uuidFromNds = routeLocalStorage.getItem(btnId);
    if (!uuidFromNds) {
      // if the route is  not in cache set it
      const cacheId = uuidv4();
      routeLocalStorage.setItem(btnId, cacheId);
      uuidLocalStorage.setItem(cacheId, route);
      // ui>n>c>1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed
      btnId = `${prefix}${ARGS_DIVIDER}n${ARGS_DIVIDER}c${ARGS_DIVIDER}${cacheId}`;
    } else {
      // already exists

      btnId = `${prefix}${ARGS_DIVIDER}n${ARGS_DIVIDER}c${ARGS_DIVIDER}${uuidFromNds}`;
    }
  }

  return btnId;
}

export function getRouteFromUUID(uuid: string) {
  return uuidLocalStorage.getItem(uuid);
}
