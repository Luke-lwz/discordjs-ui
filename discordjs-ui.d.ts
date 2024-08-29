// -- Usage definitions --

// exporat all types in project
// export * from "./types";
// export * from "./utils/buttonCache";
// export * from "./utils/navigation";

// -- Driver definitions --



// -- Entry point definition --

import * as discordjs from "discord.js"
export interface UIOptions {
    client: any
    slashCommands?: SlashCommands[]
    slashCommandRegisterFunction?: (slashCommands: SlashCommands[]) => void
    prefix?: string
    routeDirectory?: string
    customRoutes?: CustomRoutes[]
    useFunctionalButtons?: boolean
    functionalButtonTtl?: number
    globalMetadata?: any
    messageDefault?: UIMessageOptional
}
declare function createUI(options: UIOptions): {
    openUI: (interaction: any, pathname: string) => Promise<void>
    onInteraction: (interaction: any) => void
}
type SetupFunctionsType = {
    createUI: typeof createUI
    createRegisterSlashCommandsFunction: typeof createRegisterSlashCommandsFunction
}
type RouteFunctionsType = {
    render: typeof render
    deferRender: typeof deferRender
    navigate: typeof navigate
}
type BuildersType = {
    ButtonBuilder: typeof ButtonBuilder
    ModalBuilder: typeof ModalBuilder
}
type DiscordjsUI = typeof discordjs & SetupFunctionsType & RouteFunctionsType & BuildersType
export type { DiscordjsUI }
declare const discordjsUI: DiscordjsUI
export default discordjsUI