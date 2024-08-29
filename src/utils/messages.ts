




export function mergeLayout(baseLayout: any = {}, merge: any) {

    const outObj = {
        ...(baseLayout || {}),
    }

    for (const key in merge) {
            console.log(merge[key])
            outObj[key] = merge[key];
    }

    return outObj;


}