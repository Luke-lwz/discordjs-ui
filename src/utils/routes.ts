import { CustomRoutes, RouteTree } from "../types";
import { ARGS_DIVIDER } from "./CONSTANTS";
import { v4 as uuidv4 } from "uuid";

import { LocalStorage } from "node-localstorage";

const fs = require("fs");
const path = require("path");




export function getRoutesFromCustomRoutes(customRoutes: CustomRoutes[] = []): RouteTree[] { //todo: add custom routes type

  const routeTree: RouteTree[] = [];

  customRoutes.forEach((customRoute) => {

    const split = removeFirstLastSlash(customRoute.route).split("/");

    

    
  });

  return routeTree;
}
function removeFirstLastSlash(s) {
  return s.replace(/^\/|\/$/g, '');
}




export function getRoutesFromDirectory(directory: string): RouteTree[] {
  const rootDir = path.dirname(require.main.filename);

  // Define the UI directory path
  const uiDir = path.join(rootDir, (directory || "/ui").replace("/", ""));

  if (!fs.existsSync(uiDir)) {
    throw new Error(`UI directory not found at ${uiDir}`);
  }

  const files = fs.readdirSync(uiDir);
  if (!files.length) {
    throw new Error(`No files found in UI directory at ${uiDir}`);
  }

  console.log(getFileTree(uiDir));
  return getFileTree(uiDir);
}






const ALLOWED_FILE_EXTENSIONS = [".js", ".ts"];
const ALLOWED_FILE_NAMES = ["ui"];

const EXCLUEDED_DIRECTORIES_REGEX = [/^_.*$/, /^\(.*$/];

export const getFileTree = (dir, baseRoute = ""): RouteTree[] => {
  const result = [];
  const list = fs.readdirSync(dir);

  list.forEach((file) => {
    const filePath = path.join(dir, file);
    const route = path.join("", file);
    const stat = fs.statSync(filePath);

    const fileTreeNode = {
      path: filePath,
      route,
      isDirectory: stat.isDirectory(),
      children: [],
      component: undefined,
    };

    if (stat.isDirectory()) {
      if (!EXCLUEDED_DIRECTORIES_REGEX.some((regex) => regex.test(file))) {
        fileTreeNode.children = getFileTree(filePath, route);
        result.push(fileTreeNode);
      }
    } else {
      const fileExtension = path.extname(file);
      const fileName = path.basename(file, fileExtension);
      if (
        ALLOWED_FILE_EXTENSIONS.includes(fileExtension) &&
        ALLOWED_FILE_NAMES.includes(fileName)
      ) {
        try {
          const module = require(filePath);
          fileTreeNode.component = module.default || module || undefined;

          // remove any file extension from the route
          fileTreeNode.route = route.replace(fileExtension, "");

          if (
            fileTreeNode.component &&
            typeof fileTreeNode.component === "function"
          )
            result.push(fileTreeNode);
        } catch (error) {}
      }
    }
  });

  return result;
};



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
