import {CreateUserInput, LoginInput, User, UserModel} from "../schema/user.schema";
import bcrypt from "bcrypt";
import Context from "../types/contex";
import {ApolloError} from "apollo-server-express";
import config from "config";
import {signJwt} from "../utils/jwt.utils";
import {clearCookies, sendAccessToken, sendRefreshToken} from "../utils/cookieManager";
import ApiError from "../exception/api.error";

class UserService {
    async createUser(input: CreateUserInput, context: Context) {
        const user: User = (await UserModel.create(input)).toJSON();

        console.log("user", user)

        // sign a jwt
        const accessToken = signJwt(user, "accessTokenPrivateKey", { expiresIn: config.get<string>("accessTokenTtl") });
        const refreshToken = signJwt(user, "refreshTokenPrivateKey", { expiresIn: config.get<string>("refreshTokenTtl") });

        //Send tokens using cookie
        sendAccessToken(accessToken, context.res);
        sendRefreshToken(refreshToken, context.res);

        // send refresh & access token back
        return {user, accessToken, refreshToken};
    }

    async login(input: LoginInput, context: Context) {
        // Get our user by email
        const user = await UserModel.find().findByEmail(input.email).lean();

        if (!user) {
            const apiError = ApiError.Unauthorized("Invalid email or password");
            throw new ApolloError(apiError.message, apiError.code, apiError.extensions);
        }

        // validate the password
        const passwordIsValid = await bcrypt.compare(input.password, user.password);

        if (!passwordIsValid) {
            const apiError = ApiError.Unauthorized("Invalid email or password");
            throw new ApolloError(apiError.message, apiError.code, apiError.extensions);
        }

        // sign a jwt
        const accessToken = signJwt(user, "accessTokenPrivateKey", { expiresIn: config.get<string>("accessTokenTtl") });
        const refreshToken = signJwt(user, "refreshTokenPrivateKey", { expiresIn: config.get<string>("refreshTokenTtl") });

        //Send tokens using cookie
        sendAccessToken(accessToken, context.res);
        sendRefreshToken(refreshToken, context.res);

        // send refresh & access token back
        return {user, accessToken, refreshToken};
    }

    async logout(context: Context) {
        clearCookies(context.res);
        return context.user?._id;
    }
}

export default UserService;

