




export function mergeLayout(baseLayout: any = {}, merge: any) {

    const outObj = {
        ...(baseLayout || {}),
    }

    for (const key in merge) {
            outObj[key] = merge[key];
    }

    return outObj;


}