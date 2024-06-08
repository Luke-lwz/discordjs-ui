// -- Usage definitions --

// exporat all types in project
// export * from "./types";
// export * from "./utils/buttonCache";
// export * from "./utils/navigation";

// -- Driver definitions --



// -- Entry point definition --

export interface UIOptions {
    prefix?: string
    routeDirectory?: string
    customRoutes?: Routes[]
    useFunctionalButtons?: boolean
    functionalButtonTtl?: number
    globalMetadata?: any
    messageDefault?: UIMessageOptional
}
export default function createUI(options: UIOptions): {}