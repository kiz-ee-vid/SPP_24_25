export const jsonParseOrDefault = (object: any, def: any) => {
    try {
        return JSON.parse(object);
    } catch (e: any) {
        return def;
    }
}