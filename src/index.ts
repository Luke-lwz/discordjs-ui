import { CustomRoutes, RouteTree, UIMessage, UIMessageOptional } from "./types";
import createButtonCache from "./utils/buttonCache";
import {
  getFileTree,
  getRoutesFromCustomRoutes,
  getRoutesFromDirectory,
} from "./utils/routes";
import createNavigation, { getRouteFromUUID } from "./utils/navigation";
import { getBuilders } from "./utils/componentBuilders";
import { ARGS_DIVIDER, PREFIX_LENGTH } from "./utils/CONSTANTS";
import { ButtonBuilder } from "discord.js";

const fs = require("fs");
const path = require("path");

export interface UIOptions {
  prefix?: string; // default: 'ui' // maxLength = 12
  routeDirectory?: string; // default: '/ui'
  customRoutes?: CustomRoutes[]; // when provided, directory is not used
  useFunctionalButtons?: boolean; // default: false
  functionalButtonTtl?: number; // in seconds // default: 1800 (30 minutes)
  globalMetadata?: any;
  messageDefault?: UIMessageOptional;
}


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
  if (prefix.length > PREFIX_LENGTH) {
    throw new Error("Prefix length cannot be more than 12 characters");
  }
  if (prefix.includes(ARGS_DIVIDER)) {
    throw new Error(`Prefix cannot contain '${ARGS_DIVIDER}' character`);
  }

  const routes: RouteTree[] = customRoutes
    ? getRoutesFromCustomRoutes(customRoutes)
    : getRoutesFromDirectory(routeDirectory);

  // defaults




  return 


  const buttonCache = createButtonCache(functionalButtonTtl);

  // internal functions

  function uiMessage(message: UIMessage) {
    // return {
    //   name: message.title || messageDefault?.title || "",
    //   description: message.description || messageDefault?.description || "",
    // };
  }

  // external functions (starter)

  function onInteraction(interaction: any) {
    if (!interaction?.isButton() || !interaction?.isStringSelectMenu()) return;
    const { customId = "" } = interaction || {};
    if (!customId?.startsWith(prefix + ARGS_DIVIDER)) return;
    const [_prefix, type, ...args] = customId.split(ARGS_DIVIDER);

    if (_prefix !== prefix) return;

    const route = "" // edit this 🚨🚨🚨🚨🚨🚨🚨

  const {UIButtonBuilder} = getBuilders(prefix, buttonCache, route);


    const { navigate } = createNavigation(
      routes,
      interaction,
      globalMetadata,
      messageDefault
    );

    const props = {
      interaction,
      navigate,
      pathname: "",
      route: "",
      UIButtonBuilder,
      globalMetadata,
    };

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
        button?.fn?.(props);
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
