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

async function navigate(pathname: string, options: NavigateOptions = {}) {
  // 🚨 make it so navigate cannot be used in a messageLayout.js file
  const context = getContext();

  const { routes, fileName } = context;

  if (filesDisallowedToUseNavigate.includes(fileName)) {
    throw new Error(
      `You are not allowed to use navigate(); in ${fileName}.`
    );
  }

  const { uiRoute, gateRoutes, messageLayoutRoutes, notFoundRoute, notFound } =
    getUIFnAndRouteNameAndParams(pathname, routes);

  context.messageLayout = {};

  for (let i = 0; i < messageLayoutRoutes.length; i++) {
    const messageLayoutRoute = messageLayoutRoutes[i];
    if (!messageLayoutRoute.component) continue;
    contextWrapper(context, pathname, options, async (props) => {
      const messageLayoutReturn = await messageLayoutRoute?.component(props);
      if (messageLayoutReturn) {
        context.messageLayout = mergeLayout(context.messageLayout, messageLayoutReturn);
      }
    }, "messageLayout");
  }

  let allowedToContinue = true;

  contextWrapper(context, pathname, options, async (props) => {
    if (notFound) {
      const notFoundReturn = await notFoundRoute?.component?.(props);
      if (notFoundReturn) render(notFoundReturn);
      return (allowedToContinue = false);
    }
  }, "notFound");

  if (!allowedToContinue) return;

  contextWrapper(context, pathname, options, async (props) => {
    // go thru gates gates must return true to continue
    for (let i = 0; i < gateRoutes.length; i++) {
      const gateRoute = gateRoutes[i];
      if (!gateRoute.component) continue;
      const gateReturn = await gateRoute.component(props);
      if (!gateReturn) {
        return (allowedToContinue = false);
      }
    }
  }, "gate");

  if (!allowedToContinue) return;

  contextWrapper(context, pathname, options, async (props) => {
    if (uiRoute?.route === "ui") {
      const uiReturn = await uiRoute?.component?.(props);
      if (uiReturn) render(uiReturn);
      return;
    }
  }, "ui");
}

function contextWrapper(
  context: ContextType,
  pathname: string,
  options: NavigateOptions = {},
  callback: (props: NavigatePropsProps) => void,
  fileName:AllowedFileName
) {
  const { routes, interaction, globalMetadata } = context;

  const { routeName, params, searchParams, cleanPathname, errorRoute } =
    getUIFnAndRouteNameAndParams(pathname, routes);

  runWithContext(
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

      const defaultProps: NavigatePropsProps = {
        interaction: interaction,
        pathname: cleanPathname || null,
        route: routeName,
        params,
        searchParams,
        globalMetadata,
        modal,
      };

      try {
        await callback(defaultProps);
      } catch (e: any) {
        console.log(e.message);
        const errorReturn = await errorRoute?.component?.(defaultProps);
        if (errorReturn) reply(errorReturn);
        return;
      }
    }
  );
}

export default navigate;
