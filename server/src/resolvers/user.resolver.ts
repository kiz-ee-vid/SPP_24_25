import {Arg, Authorized, Ctx, Mutation, Query, Resolver} from "type-graphql";
import Context from "../types/contex";
import {CreateUserInput, LoginInput, AuthorizedUser, User} from "../schema/user.schema";
import UserService from "../service/user.service";

@Resolver()
export default class UserResolver {
    constructor(private userService: UserService) {
        this.userService = new UserService();
    }

    @Mutation(() => AuthorizedUser)
    createUser(@Arg("input") input: CreateUserInput, @Ctx() context: Context) {
        return this.userService.createUser(input, context);
    }

    @Mutation(() => AuthorizedUser)
    login(@Arg("input") input: LoginInput, @Ctx() context: Context) {
        return this.userService.login(input, context);
    }

    @Authorized()
    @Mutation(() => String)
    logout(@Ctx() context: Context) {
        return this.userService.logout(context);
    }

    @Query(() => User, { nullable: true })
    me(@Ctx() context: Context) {
        return context.user;
    }
}