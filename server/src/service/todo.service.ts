import {
    CreateTodoInput,
    DeleteTodoInput,
    Todo,
    TodoModel,
    TodosRequestInput,
    UpdateTodoInput
} from "../schema/todo.schema";
import {User} from "../schema/user.schema";
import ApiError from "../exception/api.error";
import log from "../logger/logger";
import {ApolloError} from "apollo-server-express";


export default class TodoService {
    async findAllTodos(input: TodosRequestInput, userId: string) {
        const {limit, page, filters, sortParams} = input;

        const filterQuery = filters?.filterQuery;
        const showInProgress = filters?.showInProgress;
        const showCompleted = filters?.showCompleted;
        const showOverdue = filters?.showOverdue;

        const field = sortParams?.field;
        const direction = sortParams?.direction;

        const query = {
            description: new RegExp('.*' + filterQuery + '.*'),
            user: userId,
            $or: [{
                $and: [
                    {completed: showInProgress ? false : undefined},
                    {deadline: {
                        $gte: !showOverdue ? Date.now() : '1970/01/01'}
                    }
                ]
            },
                {completed: showCompleted ? true : undefined}
            ]
        };

        const skip = (page - 1) * limit;

        const sort = {
            [field]: direction
        }

        const todos = await TodoModel.find(query, null, {skip, limit, sort});
        log.info(`[${todos.length}] Todos received`);

        const count = await TodoModel.countDocuments(query);
        log.info(`[${count}] Todos count`);

        return {
            count,
            todos
        };
    }

    async createTodo(input: CreateTodoInput & { user: User["_id"] } & { filepath?: string }) {
        return TodoModel.create(input)
    }

    async updateTodo(input: UpdateTodoInput & { user: User["_id"] } & { filepath?: string }) {
        const todoId = input.todoId;
        const todo = await TodoModel.findOne({todoId});

        this.hasPermissions(todo, input.user);

        return TodoModel.findOneAndUpdate({todoId}, input, {new: true});
    }

    async deleteTodo(input: DeleteTodoInput, userId: string) {
        const todo = await TodoModel.findOne(input);

        this.hasPermissions(todo, userId);

        await TodoModel.deleteOne(input);
        log.info(`Todo [${input.todoId}] deleted`);

        return input.todoId;
    }

    hasPermissions(todo: Todo | null, userId: string) {
        if (!todo) {
            const apiError = ApiError.NotFound();
            throw new ApolloError(apiError.message, apiError.code, apiError.extensions);
        }

        if (String(todo.user) !== String(userId)) {
            const apiError = ApiError.Unauthorized();
            throw new ApolloError(apiError.message, apiError.code, apiError.extensions);
        }
    }
}
