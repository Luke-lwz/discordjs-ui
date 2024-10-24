// -- Usage definitions --

// export all types in project
// export * from "./types";
// export * from "./utils/buttonCache";
// export * from "./utils/navigation";
// export * from "./index"

// -- Driver definitions --



// -- Entry point definition --

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
    theme?: ThemeInput
}
declare function createUI(options: UIOptions): {
    openUI: (interaction: any, pathname: string) => Promise<void>
    onInteraction: (interaction: any) => void
}
export type SetupFunctionsType = {
    createUI: typeof createUI
    createRegisterSlashCommandsFunction: typeof createRegisterSlashCommandsFunction
}
export type UtilityFunctionsType = {
    postChannelPrefab: typeof postChannelPrefab
    getTheme: typeof getTheme
}
export type RouteFunctionsType = {
    render: typeof render
    reply: typeof reply
    deferRender: typeof deferRender
    navigate: typeof navigate
}
export type BuildersType = {
    ButtonBuilder: typeof ButtonBuilder
    ModalBuilder: typeof ModalBuilder
}
type DiscordjsUI = SetupFunctionsType & RouteFunctionsType & BuildersType
export type { DiscordjsUI }
declare const discordjsUI: DiscordjsUI
export default discordjsUI
export type * from 'discord.js'