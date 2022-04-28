import {Request, Response} from "express";
import config from "config";

export const sendAccessToken = (accessToken: string, res: Response) => {
    res.cookie("X-ACCESS-TOKEN", accessToken, {
        maxAge: config.get<number>("cookieAccessTokenTtl"),
        httpOnly: true,
        sameSite: "strict",
    });
}

export const sendRefreshToken = (refreshToken: string, res: Response) => {
    res.cookie("X-REFRESH-TOKEN", refreshToken, {
        maxAge: config.get<number>("cookieRefreshTokenTtl"),
        httpOnly: true,
        sameSite: "strict",
    });
}

export const getAccessTokenFromCookies = (req: Request) => {
    return req.cookies['X-ACCESS-TOKEN'];
}

export const getRefreshTokenFromCookies = (req: Request) => {
    return req.cookies['X-REFRESH-TOKEN'];
}

export const clearCookies = (res: Response) => {
    res.clearCookie('X-ACCESS-TOKEN');
    res.clearCookie('X-REFRESH-TOKEN');
}