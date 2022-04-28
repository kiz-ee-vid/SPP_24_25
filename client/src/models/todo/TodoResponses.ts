import {ITodo} from "./ITodo";

export interface Pagination {
    count: number,
    limit: number,
    page: number
}

export interface GetTodosResponse {
    count: number;
    todos: ITodo[];
}