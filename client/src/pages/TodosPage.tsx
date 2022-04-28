import React from "react";
import TodoListFilterPanel from "../components/TodoListFilterPanel";
import Header from "../components/Header";
import {IUser} from "../models/user/IUser";
import TodoList from "../components/TodoList";

interface TodosPageProps {
    user: IUser
}

const TodosPage: React.FC<TodosPageProps> = ({user}) => {
    return (<>
        <Header user={user} />
        <TodoListFilterPanel/>
        <TodoList/>
    </>);
}

export default TodosPage;
