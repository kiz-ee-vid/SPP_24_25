export function omit(key, obj) {
    const { [key]: omitted, ...rest } = obj;
    return rest;
}