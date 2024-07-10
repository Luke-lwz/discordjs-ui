import {
  CustomRoutes,
  NavigatePropsProps,
  RouteTree,
  SlashCommands,
  UIMessage,
  UIMessageOptional,
} from "./types";
import createButtonCache from "./utils/buttonCache";
import {
  getFileTree,
  getRoutesFromCustomRoutes,
  getRoutesFromDirectory,
} from "./utils/routes";
import createNavigation, {
  getUIFnAndRouteNameAndParams,
} from "./utils/navigation";
import { getRouteFromUUID } from "./utils/routes";
import { getBuilders } from "./utils/componentBuilders";
import { ARGS_DIVIDER, PREFIX_LENGTH } from "./utils/CONSTANTS";
import { createRegisterSlashCommandsFunction } from "./utils/slashCommandFunction";
import { createUIRender } from "./utils/uiRender";

export interface UIOptions {
  client: any;
  slashCommands?: SlashCommands[];
  slashCommandRegisterFunction?: (slashCommands: SlashCommands[]) => void;
  prefix?: string; // default: 'ui' // maxLength = 12
  routeDirectory?: string; // default: '/ui'
  customRoutes?: CustomRoutes[]; // when provided, directory is not used
  useFunctionalButtons?: boolean; // default: false
  functionalButtonTtl?: number; // in seconds // default: 1800 (30 minutes)
  globalMetadata?: any;
  messageDefault?: UIMessageOptional;
}

function createUI(options: UIOptions) {
  const {
    prefix = "ui",
    routeDirectory = "/ui",
    customRoutes = null,
    useFunctionalButtons = false,
    functionalButtonTtl = 1800,
    globalMetadata,
    messageDefault = {},
    slashCommands = [],
    slashCommandRegisterFunction = null,
  } = options || {};

  // if (!client) {
  //   throw new Error("Client is required");
  // }

  if (slashCommands.length > 0 && !slashCommandRegisterFunction) {
    throw new Error(
      "slashCommandRegisterFunction is required when slashCommands are provided"
    );
  }

  if (prefix.length > PREFIX_LENGTH) {
    throw new Error("Prefix length cannot be more than 12 characters");
  }
  if (prefix.includes(ARGS_DIVIDER)) {
    throw new Error(`Prefix cannot contain '${ARGS_DIVIDER}' character`);
  }

  // register slash commands
  if (slashCommandRegisterFunction && slashCommands?.length > 0)
    slashCommandRegisterFunction(slashCommands);

  // generate routes
  const routes: RouteTree[] = customRoutes
    ? getRoutesFromCustomRoutes(customRoutes)
    : getRoutesFromDirectory(routeDirectory);

  const buttonCache = createButtonCache(functionalButtonTtl);

  // defaults

  // onInteraction({isButton: () => true, isStringSelectMenu: () => true, customId: "ui>n>r>/profile/123482938747191284" }) //test

  // internal functions

  // external functions (starter)
  function onInteraction(interaction: any) {
    if (interaction?.isChatInputCommand()) {
      // handle chat input
      const { commandName } = interaction;
      const slashCommand = slashCommands.find(
        (sc) => sc?.command?.name === commandName
      );
      if (!slashCommand) return;
      const { navigateTo } = slashCommand || {};
      if (!navigateTo) return;
      openUI(interaction, navigateTo);
    } else if (interaction?.isButton()) {
      const { customId = "" } = interaction || {};
      if (!customId?.startsWith(prefix + ARGS_DIVIDER)) return;
      const [_prefix, type, ...args] = customId.split(ARGS_DIVIDER);

      if (_prefix !== prefix) return;

      const route = ""; // edit this 🚨🚨🚨🚨🚨🚨🚨

      const { UIButtonBuilder } = getBuilders(prefix, buttonCache, route);

      const render = createUIRender(interaction);

      const { navigate } = createNavigation(
        routes,
        interaction,
        globalMetadata,
        messageDefault,
        prefix,
        buttonCache
      );


      switch (type) {
        case "n": // navigate
          const [storeLocation, arg] = args;
          switch (storeLocation) {
            case "c": // cache
              // ui>n>c>1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed
              const id = arg;
              const r = getRouteFromUUID(id);
              if (!r) return;

              navigate(r);
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

          const { routeName, params } = getUIFnAndRouteNameAndParams(
            button.currentPathname,
            routes
          );

          const props: NavigatePropsProps = {
            pathname: button.currentPathname || null,
            route: routeName,
            params: params,
            interaction,
            navigate,
            UIButtonBuilder,
            globalMetadata,
            render,
          };

          button?.fn?.(props);
          break;
        default:
          break;
      }
    }
  }

  async function openUI(interaction: any, pathname: string) {
    // open ui
    const { navigate } = createNavigation(
      routes,
      interaction,
      globalMetadata,
      messageDefault
    );

    const { UIButtonBuilder } = getBuilders(prefix, buttonCache, pathname);

    const render = createUIRender(interaction);

    const { uiFn, routeName, params } = getUIFnAndRouteNameAndParams(
      pathname,
      routes
    );

    const props: NavigatePropsProps = {
      interaction,
      navigate,
      pathname,
      params,
      route: routeName,
      UIButtonBuilder,
      globalMetadata,
      render
    };


    if (uiFn) {
      try {
        uiFn?.component?.(props);
      } catch (e) {}
    }
  }

  return { openUI, onInteraction };
}

export { createRegisterSlashCommandsFunction, createUI };
