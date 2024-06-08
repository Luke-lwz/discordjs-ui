import { RouteTree, UIMessageOptional } from "../types";


export default function createNavigation(routes: RouteTree[], interaction: any, globalMetadata: any, messageDefault?: UIMessageOptional) {
    function navigate(pathname: string, openNew = false) {

        // call function with this object

        const params = {
            interaction: interaction,
            navigate,
            pathname,
            route: "/profile/:id",
            globalMetadata,

        };
    }

    return {
        navigate,
    };
}