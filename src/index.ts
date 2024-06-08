import { Routes, UIMessage, UIMessageOptional } from "./types";
import createButtonCache from "./utils/buttonCache";
import createNavigation from "./utils/navigation";

const fs = require("fs");
const path = require("path");

export interface UIOptions {
  prefix?: string; // default: 'ui' // maxLength = 12
  routeDirectory?: string; // default: '/ui'
  customRoutes?: Routes[]; // when provided, directory is not used
  useFunctionalButtons?: boolean; // default: false
  functionalButtonTtl?: number; // in seconds // default: 1800 (30 minutes)
  globalMetadata?: any;
  messageDefault?: UIMessageOptional;
}

const ARGS_DIVIDER = ">";

export default function createUI(options: UIOptions) {
  const {
    prefix = "ui",
    routeDirectory = "/ui",
    customRoutes,
    useFunctionalButtons = false,
    functionalButtonTtl = 1800,
    globalMetadata,
    messageDefault = {},
  } = options || {};
  if (prefix.length > 12) {
    throw new Error("Prefix length cannot be more than 12 characters");
  }
  if (prefix.includes(ARGS_DIVIDER)) {
    throw new Error(`Prefix cannot contain '${ARGS_DIVIDER}' character`);
  }

  const routes: Routes[] =
    customRoutes || getRoutesFromDirectory(routeDirectory);

  // defaults

  return;

  const buttonCache = createButtonCache(functionalButtonTtl);

  // internal functions

  function uiMessage(message: UIMessage) {
    return {
      name: message.title || messageDefault?.title || "",
      description: message.description || messageDefault?.description || "",
    };
  }

  // external functions (starter)

  function onInteraction(interaction: any) {
    if (!interaction?.isButton() || !interaction?.isStringSelectMenu()) return;
    const { customId = "" } = interaction || {};
    if (!customId?.startsWith(prefix + ARGS_DIVIDER)) return;
    const [_prefix, type, ...args] = customId.split(ARGS_DIVIDER);

    if (_prefix !== prefix) return;

    const { navigate } = createNavigation(
      routes,
      interaction,
      globalMetadata,
      messageDefault
    );

    switch (type) {
      case "n": // navigate
        const [storeLocation, arg] = args;
        switch (storeLocation) {
          case "c": // cache
            // ui>n>c>1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed
            const id = arg;
            break;
          case "r": // route
            // ui>n>r>/profile/123482938747191284 // happens when route is smaller than 100 characters
            const route = arg;
            navigate(route);
            break;
          default:
            break;
        }
        break;
      case "f": // function
        if (!useFunctionalButtons) return;
        const [functionId] = args;
        // ui>f>1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed
        const button = buttonCache.get(functionId);
        button?.fn?.({ interaction, navigate, pathname: button?.currentRoute });
        break;
      default:
        break;
    }
  }

  function openUI(interaction: any, route: string) {
    const WHITESPACECHAR = ".";
    // open ui
    const { navigate } = createNavigation(
      routes,
      interaction,
      globalMetadata,
      messageDefault
    );
    interaction?.deferReply();
  }

  return {};
}

function getRoutesFromDirectory(directory: string): Routes[] {
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



interface FileTree {
  path?: string;
  route: string;
  isDirectory: boolean;
  children: FileTree[];
  component?: () => void;
}



const ALLOWED_FILE_EXTENSIONS = [".js", ".ts"];
const ALLOWED_FILE_NAMES = ["ui"];

const EXCLUEDED_DIRECTORIES_REGEX = [/^_.*$/, /^\(.*$/];

const getFileTree = (dir, baseRoute = ""): FileTree[] => {
  const result = [];
  const list = fs.readdirSync(dir);

  list.forEach((file) => {
    const filePath = path.join(dir, file);
    const route = path.join(baseRoute, file);
    const stat = fs.statSync(filePath);

    const fileTreeNode = {
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

          if (fileTreeNode.component && typeof fileTreeNode.component === 'function') result.push(fileTreeNode);
        } catch (error) {}
      }
    }
  });

  return result;
};
