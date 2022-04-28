import {createAsyncThunk} from "@reduxjs/toolkit";
import {LoginRequest, RegistrationRequest} from "../../models/user/AuthRequest";
import graphQLClient from "../../graphQLClient";
import {CHECK_AUTH} from "../../graphql/user.query";
import {LOGIN, LOGOUT, REGISTER} from "../../graphql/user.mutation";
import {convertError} from "../../utils/errorConverter";

export const login = createAsyncThunk(
    'auth/login',
    async (credentials: LoginRequest, thunkAPI) => {
        try {
            const data = await graphQLClient.request(LOGIN, { input: credentials })
            return data.login.user;
        } catch (e: any) {
            const error = convertError(e.response.errors);
            return thunkAPI.rejectWithValue(error);
        }
    }
)

export const register = createAsyncThunk(
    'auth/register',
    async (credentials: RegistrationRequest, thunkAPI) => {
        try {
            const data = await graphQLClient.request(REGISTER, { input: credentials });

            console.log("data", data)

            return data.createUser.user;
        } catch (e: any) {
            const error = convertError(e.response.errors);
            return thunkAPI.rejectWithValue(error);
        }
    }
)

export const logout = createAsyncThunk(
    'auth/logout',
    async (_, thunkAPI) => {
        try {
            const data = await graphQLClient.request(LOGOUT);
            console.log("logout", data.logout);
        } catch (e: any) {
            const error = convertError(e.response.errors);
            return thunkAPI.rejectWithValue(error);
        }
    }
)

export const isAuthorized = createAsyncThunk(
    'auth/isAuthorized',
    async (_, thunkAPI) => {
        try {
            const data = await graphQLClient.request(CHECK_AUTH);
            return data.me;
        } catch (e: any) {
            const error = convertError(e.response.errors);
            return thunkAPI.rejectWithValue(error);
        }
    }
)