import jwt from "jsonwebtoken";
import config from "config";
import log from "../logger/logger"

export const signJwt = (
    object: Object,
    keyName: "accessTokenPrivateKey" | "refreshTokenPrivateKey",
    options?: jwt.SignOptions | undefined
) => {
    const signingKey = config.get<string>(keyName);

    return jwt.sign(object, signingKey, {
        ...(options && options),
        algorithm: "RS256",
    });
}

export const verifyJwt = <T> (
    token: string,
    keyName: "accessTokenPublicKey" | "refreshTokenPublicKey"
) => {
    const publicKey = config.get<string>(keyName);

    try {
        const decoded = jwt.verify(token, publicKey);
        return {
            expired: false,
            decoded,
        };
    } catch (e: any) {
        log.error(e);
        return {
            expired: e.message === "jwt expired",
            decoded: null,
        };
    }
}