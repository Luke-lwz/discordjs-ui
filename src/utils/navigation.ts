import { NavigateOptions, NavigatePropsProps, RouteTree, UIMessageOptional } from "../types";


import { getBuilders } from "./componentBuilders";



export default function createNavigation(
  routes: RouteTree[],
  interaction: any,
  globalMetadata: any,
  messageDefault?: UIMessageOptional,
  prefix: string = "ui",
  buttonCache?: any
) {

    navigate("/test/1234") // test

  function navigate(pathname: string, options: NavigateOptions= {}) {
    const { UIButtonBuilder } = getBuilders(prefix, buttonCache, pathname);

    if (options.blank) {
      // open in new tab
      return;
    }

    const params = {};
    let routeName = "/";

    var currentRouteTree = routes;

    const pathnameSplit = pathname.split("/");
    if (pathnameSplit[0] === "") pathnameSplit.shift();

    let notFound = false;

    pathnameSplit.forEach((part, index) => {
      
      if (notFound) return;
      let directoryFound = false;
      for (let i = 0; i < currentRouteTree.length; i++) {
        const route = currentRouteTree[i];


        if (route.isDirectory) {
          if (/\[.*\]/g.test(route.route)) {
            const param = route.route.replace("[", "").replace("]", "");
            params[param] = part;
            routeName += `/:${part}`;

            //
            currentRouteTree = route.children;
            directoryFound = true;
            return true;
          }
          if (route.route === part) {
            routeName += `/${part}`;

            //
            currentRouteTree = route.children;
            directoryFound = true;
            return true;
          }
        }
      }

      if (!directoryFound) {
        notFound = true;
        return;
      }
    });


    const uiFn = currentRouteTree.find((r) => r.route === "ui");

    console.log(uiFn)

    if (notFound || !uiFn) {
      console.log("Route not found (" + pathname + ")");

      // 404 Embed 🚨

      return;
    }

    // call function with this object

    if (!(typeof uiFn.component === "function")) {
      console.error("Component is not a function (" + pathname + ")");
      return;
    }

    const props: NavigatePropsProps = {
      interaction: interaction,
      navigate,
      pathname,
      route: routeName,
      globalMetadata,
      UIButtonBuilder,
    };

    uiFn?.component?.(props);
  }

  return {
    navigate,
  };
}

