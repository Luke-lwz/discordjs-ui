import { Routes } from "../types";


export default function createNavigation(routes: Routes[], interaction: any, globalMetadata: any) {
    function navigate(pathname: string, newInteraction?: any) {

        // call function with this object

        const params = {
            interaction: newInteraction || interaction,
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