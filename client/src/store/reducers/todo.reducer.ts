import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {IError} from "../../models/IError";
import {ITodo} from "../../models/todo/ITodo";
import {createTodo, deleteTodo, fetchAllTodos, updateTodo} from "../actions/todo.actions";
import {GetTodosResponse, Pagination} from "../../models/todo/TodoResponses";
import {Filters} from "../../models/todo/TodoRequests";


interface TodoState {
    todos: ITodo[];
    filters: Filters;
    pagination: Pagination;
    isLoading: boolean;
    error: IError | null;
    successMsg: string;
}

const initialState: TodoState = {
    todos: [],
    filters: {
        filterQuery: "",
        showInProgress: true,
        showCompleted: true,
        showOverdue: true
    },
    pagination: {
        count: 0,
        limit: 15,
        page: 1
    },
    isLoading: false,
    error: null,
    successMsg: ""
}

export const todoSlice = createSlice({
    name: 'todo',
    initialState,
    reducers: {
        changeFilters: (state, action: PayloadAction<Filters>) => {
            state.filters = {
                ...state.filters,
                ...action.payload
            }
        },
        setPage: (state, action: PayloadAction<number>) => {
            state.pagination.page = action.payload;
        },
        clearError: (state) => {
            state.error = null;
        }
    },
    extraReducers: {
        //Read
        [fetchAllTodos.fulfilled.type]: (state, action: PayloadAction<GetTodosResponse>) => {
            state.isLoading = false;
            state.error = null;
            // state.successMsg = "";
            state.todos = action.payload.todos;
            state.pagination.count = action.payload.count;
        },
        [fetchAllTodos.pending.type]: (state) => {
            state.isLoading = true;
        },
        [fetchAllTodos.rejected.type]: (state, action: PayloadAction<IError>) => {
            state.isLoading = false;
            state.error = action.payload;
        },
        //Create
        [createTodo.fulfilled.type]: (state, action: PayloadAction<ITodo>) => {
            if (state.todos.length + 1 <= state.pagination.limit) {
                state.todos = [...state.todos, action.payload];
            }

            state.pagination.count += 1;

            state.isLoading = false;
            state.error = null;
            state.successMsg = `Successfully created todo #${state.pagination.count}`;
        },
        [createTodo.pending.type]: (state) => {
            state.isLoading = false;
            state.successMsg = "";
        },
        [createTodo.rejected.type]: (state, action: PayloadAction<IError>) => {
            state.isLoading = false;
            state.error = action.payload;
        },
        //Update
        [updateTodo.fulfilled.type]: (state, action: PayloadAction<ITodo>) => {
            state.isLoading = false;
            state.error = null;

            const todoIndex = state.todos.map(todo => todo.todoId).indexOf(action.payload.todoId);

            state.successMsg = `Successfully updated todo #${(state.pagination.page - 1) * state.pagination.limit + todoIndex + 1}`;
            state.todos[todoIndex] = action.payload;
        },
        [updateTodo.pending.type]: (state) => {
            state.isLoading = false;
            state.successMsg = "";
        },
        [updateTodo.rejected.type]: (state, action: PayloadAction<IError>) => {
            state.isLoading = false;
            state.error = action.payload;
        },
        //Delete
        [deleteTodo.fulfilled.type]: (state, action: PayloadAction<string>) => {
            state.isLoading = false;
            state.error = null;

            const todoIndex = state.todos.map(todo => todo.todoId).indexOf(action.payload);

            state.successMsg = `Successfully deleted todo #${(state.pagination.page - 1) * state.pagination.limit + todoIndex + 1}`;
            state.todos = state.todos.filter(todo => todo.todoId !== action.payload);
            state.pagination.count -= 1;
        },
        [deleteTodo.pending.type]: (state) => {
            state.isLoading = false;
            state.successMsg = "";
        },
        [deleteTodo.rejected.type]: (state, action: PayloadAction<IError>) => {
            state.isLoading = false;
            state.error = action.payload;
        },
    }
})

export default todoSlice.reducer;
