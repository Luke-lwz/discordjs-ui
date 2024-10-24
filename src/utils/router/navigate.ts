import { error } from "console";
import { NavigateOptions, NavigatePropsProps } from "../../types";
import { ContextType, getContext, runWithContext } from "../context";
import {
  getNewPathNameWithSearchParams,
  getUIFnAndRouteNameAndParams,
} from "../navigation";
import render from "../render/render";
import reply from "../render/reply";
import { mergeLayout } from "../messages";
import { AllowedFileName } from "../routes";
import { filesDisallowedToUseNavigate } from "./constraints";
import getTheme from "../theme/theme";

async function navigate(pathname: string, options: NavigateOptions = {}) {
  // 🚨 make it so navigate cannot be used in a messageLayout.js file
  const context = getContext();

  const { routes, fileName } = context;

  if (filesDisallowedToUseNavigate.includes(fileName)) {
    throw new Error(`You are not allowed to use navigate(); in ${fileName}.`);
  }

  const {
    uiRoute,
    gateRoutes,
    messageLayoutRoutes,
    notFoundRoute,
    notFound,
    contextRoutes,
  } = getUIFnAndRouteNameAndParams(pathname, routes);

  context.messageLayout = {};

  for (let i = 0; i < messageLayoutRoutes.length; i++) {
    const messageLayoutRoute = messageLayoutRoutes[i];
    if (!messageLayoutRoute.component) continue;
    await contextWrapper(
      context,
      pathname,
      options,
      async (props) => {
        const messageLayoutReturn = await messageLayoutRoute?.component(props);
        if (messageLayoutReturn) {
          context.messageLayout = mergeLayout(
            context.messageLayout,
            messageLayoutReturn
          );
        }
      },
      "messageLayout"
    );
  }

  context.context = {};

  for (let i = 0; i < contextRoutes.length; i++) {
    const contextRoute = contextRoutes[i];
    if (!contextRoute.component) continue;
    await contextWrapper(
      context,
      pathname,
      options,
      async (props) => {
        const contextReturn = await contextRoute?.component(props);
        if (contextReturn) {
          context.context = mergeLayout(context.context, contextReturn);
        }
      },
      "context"
    );
  }

  let allowedToContinue = true;

  await contextWrapper(
    context,
    pathname,
    options,
    async (props) => {
      if (notFound) {
        const notFoundReturn = await notFoundRoute?.component?.(props);
        if (notFoundReturn) render(notFoundReturn);
        return (allowedToContinue = false);
      }
    },
    "notFound"
  );

  if (!allowedToContinue) return;

  await contextWrapper(
    context,
    pathname,
    options,
    async (props) => {
      // go thru gates gates must return true to continue
      for (let i = 0; i < gateRoutes.length; i++) {
        const gateRoute = gateRoutes[i];
        if (!gateRoute.component) continue;
        const gateReturn = await gateRoute.component(props);
        if (!gateReturn) {
          return (allowedToContinue = false);
        }
      }
    },
    "gate"
  );

  if (!allowedToContinue) return;

  await contextWrapper(
    context,
    pathname,
    options,
    async (props) => {
      if (uiRoute?.route === "ui") {
        const uiReturn = await uiRoute?.component?.(props);
        if (uiReturn) render(uiReturn);
        return;
      }
    },
    "ui"
  );
}

async function contextWrapper(
  context: ContextType,
  pathname: string,
  options: NavigateOptions = {},
  callback: (props: NavigatePropsProps) => void,
  fileName: AllowedFileName
) {
  const { routes, interaction, globalMetadata } = context;

  const { routeName, params, searchParams, cleanPathname, errorRoute } =
    getUIFnAndRouteNameAndParams(pathname, routes);

  await runWithContext(
    {
      ...context,
      fileName,
      currentPathname: pathname,
    },
    async () => {
      // pathname = getNewPathNameWithSearchParams(
      //   pathname,
      //   options?.searchParams
      // );

      let modal = null;
      if (interaction?.fields?.fields) {
        modal = {};
        const keys = interaction.fields.fields.keys();
        for (const key of keys) {
          modal[key] = interaction.fields.fields.get(key)?.value || null;
        }
      }

      const theme = getTheme(); // 🚨 not performant, needs new solution

      const defaultProps: NavigatePropsProps = {
        interaction: interaction,
        pathname: cleanPathname || null,
        route: routeName,
        params,
        searchParams,
        globalMetadata,
        context: context.context || {},
        modal,
        theme,
      };

      try {
        await callback(defaultProps);
      } catch (e: any) {
        console.log(e);
        try {
          await runWithContext(
            {
              ...context,
              fileName: "error",
              currentPathname: pathname,
            },
            async () => {
              const errorReturn = await errorRoute?.component?.(defaultProps);
              if (errorReturn) reply(errorReturn);
            }
          );
        } catch (e: any) {
          console.log(e);
        }
        return;
      }
    }
  );
}

export default navigate;
