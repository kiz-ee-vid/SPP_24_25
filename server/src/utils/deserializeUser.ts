import {signJwt, verifyJwt} from "./jwt.utils";
import config from "config";
import log from "../logger/logger"
import Context from "../types/contex";
import {User} from "../schema/user.schema";
import {getAccessTokenFromCookies, sendAccessToken} from "./cookieManager";


const deserializeUser = (ctx: Context): Context => {
    const context = ctx;

    const accessToken = getAccessTokenFromCookies(context.req);
    const refreshToken = getAccessTokenFromCookies(context.req);

    if (!accessToken) {
        return context;
    }

    const {decoded, expired} = verifyJwt<User>(accessToken, "accessTokenPublicKey");

    if (decoded) {
        context.user = decoded;
        return context;
    }

    if (expired && refreshToken) {
        const newAccessToken = reIssueAccessToken(refreshToken);

        if (newAccessToken) {
            log.info("New token generated using refresh token");

            sendAccessToken(accessToken, context.res);
        }

        const result = verifyJwt<User>(newAccessToken as string, "accessTokenPublicKey");

        context.user = result.decoded;
    }

    return context;
};

export default deserializeUser;

const reIssueAccessToken = (refreshToken: string) => {
    // Decode the refresh token
    const {decoded, expired} = verifyJwt<User>(refreshToken, "refreshTokenPublicKey");

    if (!decoded || expired) {
        return false;
    }

    return signJwt(decoded, "accessTokenPrivateKey", { expiresIn: config.get<string>("accessTokenTtl") });
}