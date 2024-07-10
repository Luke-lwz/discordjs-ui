// -- Usage definitions --

// exporat all types in project
// export * from "./types";
// export * from "./utils/buttonCache";
// export * from "./utils/navigation";

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
}
export interface SlashCommands {
    command: any
    navigateTo: string
}
declare function createUI(options: UIOptions): {
    openUI: (interaction: any, pathname: string) => void
    onInteraction: (interaction: any) => void
}
export { SlashCommandsRegisterFunction, createUI }