import { customAlphabet } from "nanoid";
import {User} from "./user.schema";
import {Field, InputType, Int, ObjectType} from "type-graphql";
import {getModelForClass, index, prop, Ref} from "@typegoose/typegoose";
import {IsBoolean, IsDate, MinLength} from "class-validator";

const nanoid = customAlphabet("abcdefghijklmnopqrstuvwxyz123456789", 32);

@ObjectType()
@index({ todoId: 1 })
export class Todo {
    @Field(() => String)
    _id: string;

    @Field(() => String)
    @prop({ required: true, default: () => nanoid() })
    todoId: string;

    @Field(() => String)
    @prop({ required: true, ref: () => User })
    user: Ref<User>;

    @Field(() => String)
    @prop({ required: true })
    description: string;

    @Field(() => Date)
    @prop({ required: true })
    deadline: Date;

    @Field(() => Boolean)
    @prop({ required: true, default: false })
    completed: boolean;

    @Field(() => String, { nullable: true })
    @prop({ required: false })
    filepath: string;
}

export const TodoModel = getModelForClass<typeof Todo>(Todo);

@ObjectType()
export class TodosResponse {
    @Field(() => Int)
    count: number

    @Field(() => [Todo])
    todos: Todo
}

@InputType()
export class Filters {
    @Field(() => Boolean, { nullable: true })
    showInProgress: boolean

    @Field(() => Boolean, { nullable: true })
    showCompleted: boolean

    @Field(() => Boolean, { nullable: true })
    showOverdue: boolean

    @Field(() => String, { nullable: true })
    filterQuery: string
}

@InputType()
export class SortParams {
    @Field(() => String, { nullable: true })
    field: string

    @Field(() => String, { nullable: true })
    direction: string
}

@InputType()
export class TodosRequestInput {
    @Field(() => Int)
    limit: number

    @Field(() => Int)
    page: number

    @Field(() => Filters, { nullable: true })
    filters: Filters

    @Field(() => SortParams, { nullable: true })
    sortParams: SortParams
}

@InputType()
export class CreateTodoInput {
    @MinLength(3, {
        message: "Description must be at least 3 characters",
    })
    @Field()
    description: string;

    @IsDate({
        message: "Date is required"
    })
    @Field()
    deadline: Date;
}

@InputType()
export class UpdateTodoInput {
    @Field()
    todoId: string;

    @MinLength(3, {
        message: "Description must be at least 3 characters",
    })
    @Field({ nullable: true })
    description: string;

    @IsDate({
        message: "Date is required"
    })
    @Field({ nullable: true })
    deadline: Date;

    @IsBoolean()
    @Field({ nullable: true })
    completed: boolean;
}

@InputType()
export class DeleteTodoInput {
    @Field()
    todoId: string;
}
