import {Arg, Authorized, Ctx, Mutation, Query, Resolver} from "type-graphql";
import {FileUpload, GraphQLUpload} from "graphql-upload"
import Context from "../types/contex";
import {
    CreateTodoInput,
    DeleteTodoInput,
    Todo,
    TodosRequestInput,
    TodosResponse,
    UpdateTodoInput
} from "../schema/todo.schema";
import TodoService from "../service/todo.service";
import {createWriteStream} from "fs";


@Resolver()
export default class TodoResolver {
    constructor(private todoService: TodoService) {
        this.todoService = new TodoService();
    }

    @Authorized()
    @Query(() => TodosResponse)
    showTodos(@Arg("input") input: TodosRequestInput, @Ctx() context: Context) {
        const user = context.user!;
        return this.todoService.findAllTodos(input, user?._id);
    }

    @Authorized()
    @Mutation(() => Todo)
    async createTodo(@Arg("file", () => GraphQLUpload, { nullable: true }) file: FileUpload,
                     @Arg("input") input: CreateTodoInput, @Ctx() context: Context) {
        let uri;

        if (file) {
            const {filename, createReadStream} = file;

            uri = `uploads/${filename}`;
            await createReadStream().pipe(createWriteStream(`../client/public/${uri}`));
        }

        const user = context.user!;
        return this.todoService.createTodo({...input, user: user?._id, filepath: uri});
    }

    @Mutation(() => Todo)
    async updateTodo(@Arg("file", () => GraphQLUpload, { nullable: true }) file: FileUpload,
                     @Arg("input") input: UpdateTodoInput, @Ctx() context: Context) {
        let uri;

        if (file) {
            const {filename, createReadStream} = file;

            uri = `uploads/${filename}`;
            await createReadStream().pipe(createWriteStream(`../client/public/${uri}`));
        }

        const user = context.user!;
        return this.todoService.updateTodo({...input, user: user?._id, filepath: uri});
    }

    @Authorized()
    @Mutation(() => String)
    deleteTodo(@Arg("input") input: DeleteTodoInput, @Ctx() context: Context) {
        const user = context.user!;
        return this.todoService.deleteTodo(input, user._id);
    }
}