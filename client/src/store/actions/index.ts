import * as AuthActions from "./auth.actions"
import * as TodoActions from "./todo.actions"
import {todoSlice} from "../reducers/todo.reducer"

export const Actions = {
    ...AuthActions,
    ...TodoActions,
    ...todoSlice.actions
}