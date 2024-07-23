import { NavigateOptions, NavigatePropsProps } from "../../types";
import { getContext, runWithContext } from "../context";
import {
  getNewPathNameWithSearchParams,
  getUIFnAndRouteNameAndParams,
} from "../navigation";
import render from "../render/render";

async function navigate(pathname: string, options: NavigateOptions = {}) {
  const { routes, interaction, globalMetadata, prefix, buttonCache } =
    getContext();

  runWithContext(
    {
      routes,
      interaction,
      globalMetadata,
      prefix,
      buttonCache,
      currentPathname: pathname,
    },
    async () => {
      if (options.blank) {
        // open in new tab
        return;
      }

      pathname = getNewPathNameWithSearchParams(
        pathname,
        options?.searchParams
      );

      const {
        uiRoute,
        errorRoute,
        gateErrorRoute,
        gateRoutes,
        notFoundRoute,
        loadingRoute,
        routeName,
        params,
        searchParams,
        cleanPathname,
        notFound,
      } = getUIFnAndRouteNameAndParams(pathname, routes);

      const defaultProps: NavigatePropsProps = {
        interaction: interaction,
        pathname: cleanPathname || null,
        route: routeName,
        params,
        searchParams,
        globalMetadata,
      };

      try {
        if (loadingRoute) {
          const loadingReturn = await loadingRoute?.component?.(defaultProps);
          if (loadingReturn) render(loadingReturn);
        }

        if (notFound) {
          const notFoundReturn = await notFoundRoute?.component?.(defaultProps);
          if (notFoundReturn) render(notFoundReturn);
          return;
        }

        // go thru checks
        for (let i = 0; i < gateRoutes.length; i++) {
          const checkRoute = gateRoutes[i];
          if (!checkRoute.component) continue;
          const checkResult = checkRoute.component(defaultProps);
          if (!checkResult) {
            const gateErrorReturn = await gateErrorRoute?.component?.(
              defaultProps
            );
            if (gateErrorReturn) render(gateErrorReturn);
            return;
          }
        }

        if (uiRoute?.route === "ui") {
          const uiReturn = await uiRoute?.component?.(defaultProps);
          if (uiReturn) render(uiReturn);
          return;
        }
      } catch (e) {
        console.log(e.message);
        const errorReturn = await errorRoute?.component?.(defaultProps);
        if (errorReturn) render(errorReturn);
        return;
      }
    }
  );
}



export default navigate;