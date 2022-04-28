import {IUser} from "../../models/user/IUser";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {isAuthorized, login, logout, register} from "../actions/auth.actions";
import {IError} from "../../models/IError";

interface AuthState {
    user: IUser | null,
    isLoading: boolean,
    error: IError | null,
    successMsg: string
}

const initialState: AuthState = {
    user: null,
    isLoading: false,
    error: null,
    successMsg: ""
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {},
    extraReducers: {
        //Login
        [login.fulfilled.type]: (state, action: PayloadAction<IUser>) => {
            state.isLoading = false;
            state.error = null;
        //    state.successMsg = "Successfully logged in";
            state.user = action.payload;
        },
        [login.pending.type]: (state) => {
            state.isLoading = true;
        },
        [login.rejected.type]: (state, action: PayloadAction<IError>) => {
            state.isLoading = false;
            state.error = action.payload;
        },
        //Registration
        [register.fulfilled.type]: (state, action: PayloadAction<IUser>) => {
            state.isLoading = false
            state.error = null;
        //    state.successMsg = "Successfully registered";
            state.user = action.payload;
        },
        [register.pending.type]: (state) => {
            state.isLoading = true;
        },
        [register.rejected.type]: (state, action: PayloadAction<IError>) => {
            state.isLoading = false;
            state.error = action.payload;
        },
        //Log out
        [logout.fulfilled.type]: (state) => {
            state.isLoading = false
            state.error = null;
        //    state.successMsg = "Session dropped";
            state.user = null
        },
        [logout.pending.type]: (state) => {
            state.isLoading = true
        },
        [logout.rejected.type]: (state, action: PayloadAction<IError>) => {
            state.isLoading = false
            state.error = action.payload;
        },
        //isAuthorized
        [isAuthorized.fulfilled.type]: (state, action: PayloadAction<IUser>) => {
            state.isLoading = false
            state.error = null;
            state.user = action.payload;
        },
        [isAuthorized.pending.type]: (state) => {
            state.isLoading = false
        },
        [isAuthorized.rejected.type]: (state) => {
            state.isLoading = false
            state.user = null
        },
    }
})

export default authSlice.reducer;
