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
import { getUIFnAndRouteNameAndParams } from "./utils/navigation";
import { getRouteFromUUID } from "./utils/routes";
import { ARGS_DIVIDER, PREFIX_LENGTH } from "./utils/CONSTANTS";
import { createRegisterSlashCommandsFunction } from "./utils/slashCommandFunction";
import render from "./utils/render/render";
import deferRender from "./utils/render/deferRender";
import ButtonBuilder from "./utils/builders/ButtonBuilder";
import navigate from "./utils/router/navigate";
import { runWithContext } from "./utils/context";
import * as discordjs from "discord.js";
import ModalBuilder from "./utils/builders/ModalBuilder";
import reply from "./utils/render/reply";
import { postChannelPrefab } from "./utils/channelPrefab";

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
    runWithContext(
      {
        routes,
        interaction,
        globalMetadata,
        prefix,
        buttonCache,
        messageLayout: {},
        context: {},
      },
      async () => {
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
        } else if (interaction?.isButton() || interaction?.isModalSubmit()) {
          const { customId = "" } = interaction || {};
          if (!customId?.startsWith(prefix + ARGS_DIVIDER)) return;
          const [_prefix, type, ...args] = customId.split(ARGS_DIVIDER);

          if (_prefix !== prefix) return;

          const route = ""; // edit this 🚨🚨🚨🚨🚨🚨🚨

          let modal = null;
          if (interaction?.fields?.fields) {
            modal = {};
            const keys = interaction.fields.fields.keys();
            for (const key of keys) {
              modal[key] = interaction.fields.fields.get(key)?.value || null;
            }
          }

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

              const { routeName, params, searchParams, cleanPathname } =
                getUIFnAndRouteNameAndParams(button.currentPathname, routes);

              const props: NavigatePropsProps = {
                pathname: cleanPathname || null,
                route: routeName,
                params: params,
                searchParams,
                interaction,
                globalMetadata,

                modal,
                context: {}
              };

              button?.fn?.(props);
              break;
            default:
              break;
          }
        }
      }
    );
  }

  async function openUI(interaction: any, pathname: string) {
    // open ui

    runWithContext(
      {
        routes,
        interaction,
        globalMetadata,
        prefix,
        buttonCache,
        messageLayout: {},
        context: {},
      },
      async () => {
        await navigate(pathname);
      }
    );
  }

  return { openUI, onInteraction };
}




export type SetupFunctionsType = {
  createUI: typeof createUI;
  createRegisterSlashCommandsFunction: typeof createRegisterSlashCommandsFunction;
};

export type UtilityFunctionsType = {
  postChannelPrefab: typeof postChannelPrefab;
};

export type RouteFunctionsType = {
  render: typeof render;
  reply: typeof reply;
  deferRender: typeof deferRender;
  navigate: typeof navigate;
};

export type BuildersType = {
  ButtonBuilder: typeof ButtonBuilder;
  ModalBuilder: typeof ModalBuilder;
};

// Combine all types into a single type
type DiscordjsUI = typeof discordjs & SetupFunctionsType & RouteFunctionsType & BuildersType;

// Export the combined type
export type { DiscordjsUI };

const setupFunctions: SetupFunctionsType = {
  createUI,
  createRegisterSlashCommandsFunction,
};

const utilityFunctions:  UtilityFunctionsType = {
  postChannelPrefab,
};

const routeFunctions: RouteFunctionsType = {
  render,
  reply,
  deferRender,
  navigate,
};

const builders: BuildersType = {
  ButtonBuilder,
  ModalBuilder,
};

const discordjsUI: DiscordjsUI = {
  ...discordjs,
  ...setupFunctions,
  ...utilityFunctions,
  ...routeFunctions,
  ...builders,
};

export default discordjsUI;
