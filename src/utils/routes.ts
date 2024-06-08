import { CustomRoutes, RouteTree } from "../types";

const fs = require("fs");
const path = require("path");




export function getRoutesFromCustomRoutes(customRoutes: CustomRoutes[] = []): RouteTree[] {
  return customRoutes.map((route) => {
    return {
      route: route.route,
      isDirectory: false,
      children: route.subRoutes ? getRoutesFromCustomRoutes(route.subRoutes) : [],
      component: route.component,
    };
  });
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
  return [];
}






const ALLOWED_FILE_EXTENSIONS = [".js", ".ts"];
const ALLOWED_FILE_NAMES = ["ui"];

const EXCLUEDED_DIRECTORIES_REGEX = [/^_.*$/, /^\(.*$/];

export const getFileTree = (dir, baseRoute = ""): RouteTree[] => {
  const result = [];
  const list = fs.readdirSync(dir);

  list.forEach((file) => {
    const filePath = path.join(dir, file);
    const route = path.join(baseRoute, file);
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
          console.log(module);
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
