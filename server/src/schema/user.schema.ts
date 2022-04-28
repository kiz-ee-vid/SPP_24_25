import {
    getModelForClass,
    prop,
    pre,
    ReturnModelType,
    queryMethod,
    index,
} from "@typegoose/typegoose";
import { AsQueryMethod } from "@typegoose/typegoose/lib/types";
import bcrypt from "bcrypt";
import { IsEmail, MaxLength, MinLength } from "class-validator";
import { Field, InputType, ObjectType } from "type-graphql";
import {Match} from "../decorator/match.decorator";
import config from "config";

function findByEmail(
    this: ReturnModelType<typeof User, QueryHelpers>,
    email: User["email"]
) {
    return this.findOne({ email });
}

interface QueryHelpers {
    findByEmail: AsQueryMethod<typeof findByEmail>;
}

@pre<User>("save", async function () {
    // Check that the password is being modified
    if (!this.isModified("password")) {
        return;
    }

    const salt = await bcrypt.genSalt(config.get<number>('saltWorkFactor'));
    this.password = await bcrypt.hashSync(this.password, salt);
})
@queryMethod(findByEmail)
@index({email: 1}, {unique: true})
@ObjectType()
export class User {
    @Field(() => String)
    _id: string;

    @Field(() => String)
    @prop({ required: true })
    name: string;

    @Field(() => String)
    @prop({ required: true, unique: true })
    email: string;

    @Field(() => String)
    @prop({ required: true })
    password: string;
}

export const UserModel = getModelForClass<typeof User, QueryHelpers>(User);

@ObjectType()
export class AuthorizedUser {
    @Field(() => User)
    user: User;

    @Field(() => String)
    accessToken: string;

    @Field(() => String)
    refreshToken: string;
}

@InputType()
export class CreateUserInput {
    @MinLength(6, {
        message: "Name must be at least 6 characters long",
    })
    @MaxLength(50, {
        message: "Password must not be longer than 50 characters",
    })
    @Field(() => String)
    name: string;

    @IsEmail({}, { message: "Provide correct email"})
    @Field(() => String)
    email: string;

    @MinLength(6, {
        message: "Password must be at least 6 characters long",
    })
    @MaxLength(50, {
        message: "Password must not be longer than 50 characters",
    })
    @Field(() => String)
    password: string;

    @MinLength(1, {
        message: "Password confirmation is required",
    })
    @Match('password', {
        message: "Passwords must match"
    })
    @Field(() => String)
    passwordConfirmation: string;
}

@InputType()
export class LoginInput {
    @IsEmail({}, { message: "Provide correct email"})
    @Field(() => String)
    email: string;

    @MinLength(1, {
        message: "Password is required",
    })
    @Field(() => String)
    password: string;
}