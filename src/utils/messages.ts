




export function mergeLayout(baseLayout: any, merge: any) {
    const outLayout = {};

    function recurseThroughObject(baseLayout, merge) {
        for (const key in baseLayout) {
            if (typeof baseLayout[key] === 'object' && !Array.isArray(baseLayout[key])) {
                outLayout[key] = {};
                recurseThroughObject(baseLayout[key], merge[key]);
            } else  { // if it's not an object
                outLayout[key] = merge[key] || baseLayout[key];
            }
        }
    }
    recurseThroughObject(baseLayout, merge);


}