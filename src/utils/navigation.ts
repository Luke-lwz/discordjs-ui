
import { RouteTree, UIMessageOptional } from "../types";

import { v4 as uuidv4 } from 'uuid';

import {LocalStorage } from 'node-localstorage';
import { ARGS_DIVIDER } from "./CONSTANTS";



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


const maxLength = 100;


const uuidLocalStorage = new LocalStorage('./discordjs-ui/localStorage/routes/uuid');
const routeLocalStorage = new LocalStorage('./discordjs-ui/localStorage/routes/route');

export function encodeRoute(route: string, prefix: string) {
    // ui>n>r>/profile/123482938747191284
    let btnId =  `${prefix}${ARGS_DIVIDER}n${ARGS_DIVIDER}r${ARGS_DIVIDER}${route}`;
    if (btnId.length > maxLength) { // use cache
        const uuidFromNds = routeLocalStorage.getItem(btnId);
        if (!uuidFromNds) { // if the route is  not in cache set it 
            const cacheId = uuidv4();
            routeLocalStorage.setItem(btnId, cacheId);
            uuidLocalStorage.setItem(cacheId, route);
            // ui>n>c>1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed
            btnId = `${prefix}${ARGS_DIVIDER}n${ARGS_DIVIDER}c${ARGS_DIVIDER}${cacheId}`;
        } else { // already exists

            btnId = `${prefix}${ARGS_DIVIDER}n${ARGS_DIVIDER}c${ARGS_DIVIDER}${uuidFromNds}`;
        }
    }


    return btnId;


}


export function getRouteFromUUID(uuid: string) {
    return uuidLocalStorage.getItem(uuid);
}