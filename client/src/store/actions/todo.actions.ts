import {createAsyncThunk} from "@reduxjs/toolkit";
import graphQLClient from "../../graphQLClient";
import {GET_TODOS} from "../../graphql/todo.query";
import {CreateTodoRequest, GetTodosRequest, UpdateTodoRequest} from "../../models/todo/TodoRequests";
import {CREATE_TODO, DELETE_TODO, UPDATE_TODO} from "../../graphql/todo.mutation";
import {convertError} from "../../utils/errorConverter";
import {omit} from "../../utils/omit";

export const fetchAllTodos = createAsyncThunk(
    'todo/fetchAllTodos',
    async (filters: GetTodosRequest, thunkAPI) => {
        try {
            const data = await graphQLClient.request(GET_TODOS, { input: filters })
            return data.showTodos;
        } catch (e: any) {
            const error = convertError(e.response.errors);
            return thunkAPI.rejectWithValue(error);
        }
    }
)

export const createTodo = createAsyncThunk(
    'todo/createTodo',
    async (credentials: CreateTodoRequest, thunkAPI) => {
        try {
            const data = await graphQLClient.request(CREATE_TODO, { input: omit("file", credentials), file: credentials.file });
            return data.createTodo;
        } catch (e: any) {
            const error = convertError(e.response.errors);
            return thunkAPI.rejectWithValue(error);
        }
    }
)

export const updateTodo = createAsyncThunk(
    'todo/updateTodo',
    async (credentials: UpdateTodoRequest, thunkAPI) => {
        try {
            const data = await graphQLClient.request(UPDATE_TODO, { input: omit("filepath", omit("file", credentials)), file: credentials.file });
            return data.updateTodo;
        } catch (e: any) {
            const error = convertError(e.response.errors);
            return thunkAPI.rejectWithValue(error);
        }
    }
)

export const deleteTodo = createAsyncThunk(
    'todo/deleteTodo',
    async (todoId: string, thunkAPI) => {
        try {
            const data = await graphQLClient.request(DELETE_TODO, { input: {todoId} });
            return data.deleteTodo;
        } catch (e: any) {
            const error = convertError(e.response.errors);
            return thunkAPI.rejectWithValue(error);
        }
    }
)