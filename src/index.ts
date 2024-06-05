import { Routes } from "./types";
import createButtonCache from "./utils/buttonCache";
import createNavigation from "./utils/navigation";

export interface UIOptions {
  prefix?: string; // default: 'ui' // maxLength = 12
  routeDirectory?: string; // default: '/ui'
  customRoutes?: Routes[]; // when provided, directory is not used
  useFunctionalButtons?: boolean; // default: false
  functionalButtonTtl?: number; // in seconds // default: 1800 (30 minutes)
  globalMetadata?: any;
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
  } = options;
  if (prefix.length > 12) {
    throw new Error("Prefix length cannot be more than 12 characters");
  }
  if (prefix.includes(ARGS_DIVIDER)) {
    throw new Error(`Prefix cannot contain '${ARGS_DIVIDER}' character`);
  }

  const routePrefix = routeDirectory + prefix;
  const routes: Routes[] =
    customRoutes || getRoutesFromDirectory(routeDirectory);

  // defaults

  const buttonCache = createButtonCache(functionalButtonTtl);

  function onInteraction(interaction: any) {
    if (!interaction?.isButton() || !interaction?.isStringSelectMenu()) return;
    const { customId = "" } = interaction || {};
    if (!customId?.startsWith(prefix + ARGS_DIVIDER)) return;
    const [_prefix, type, ...args] = customId.split(ARGS_DIVIDER);

    if (_prefix !== prefix) return;

    const { navigate } = createNavigation(routes, interaction, globalMetadata);

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
        const [functionId] = args;
        // ui>f>1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed
        const button = buttonCache.get(functionId);
        button?.fn?.({ interaction, navigate, pathname: button?.currentRoute });
        break;
      default:
        break;
    }
  }
}

function getRoutesFromDirectory(directory: string): Routes[] {
  return [];
}
