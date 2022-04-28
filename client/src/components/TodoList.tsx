import React, {useEffect, useState} from "react";
import TodoItem from "./TodoItem";
import Pagination from "./Pagination";
import SortPanel from "./SortPanel";
import Loader from "./Loader";
import {useTypedSelector} from "../hooks/useTypedSelector";
import {ITodo} from "../models/todo/ITodo";
import {useActions} from "../hooks/useActions";
import {SortParams} from "../models/todo/TodoRequests";
import {showToast, ToastReason} from "../utils/showToast";
import {addErrorsToDom} from "../utils/addErrorsToDom";
import useSocket from "../hooks/useSocket";


const TodoList: React.FC = () => {
    const {socket, connectToRoomHandler, todosChangeListener, todosChangeNotifier} = useSocket();
  //  const {user} = useTypedSelector(store => store.authReducer);
    const {todos, pagination: {limit, page, count}, filters, isLoading, error, successMsg} = useTypedSelector(store => store.todoReducer);
    const [sortParams, setSortParams] = useState<SortParams>();
    const {fetchAllTodos, setPage} = useActions();

    useEffect(() => {
        if (todos.length === 0 && page > 1) {
            setPage(page - 1);
        }
    }, [todos])

    useEffect(() => {
        fetchAllTodos({page, limit, filters, sortParams});
    }, [filters, page, sortParams])

    // useEffect(() => {
    //     if (successMsg) {
    //         todosChangeNotifier(user?.email!);
    //         showToast(successMsg, ToastReason.SUCCESS);
    //     }
    // }, [successMsg])

    useEffect(() => {
        if (error) {
            showToast(error.message);
            addErrorsToDom(error.validationErrors);
        }
    }, [error])

    // useEffect(() => {
    //     if (user) {
    //         connectToRoomHandler(user.email);
    //     }
    // }, [])

    // useEffect(() => {
    //     todosChangeListener(() => fetchAllTodos({page, limit, filters, sortParams}));
    // }, [socket])
    //
    // if (isLoading) {
    //     return <Loader/>
    // }

    if (!todos || todos.length === 0) {
        return (<>
            <div className="text-center alert alert-info mt-3" role="alert">
                No notes
            </div>
        </>);
    }

    return (<>
        <table className="table align-middle mt-3">
            <thead className="text-white bg-secondary">
            <tr>
                <th scope="col" className="col-md">Number</th>
                <th scope="col" className="col-md-5-3">
                           Status
                    <SortPanel field={'completed'} sort={sortParams} setSort={setSortParams}/>
                </th>
                <th scope="col" className="col-md-0-0">
                    Title
                    <SortPanel field={'description'} sort={sortParams} setSort={setSortParams}/>
                </th>
                <th scope="col" className="col-md">
                    Deadline
                    <SortPanel field={'deadline'} sort={sortParams} setSort={setSortParams}/>
                </th>
                <th scope="col" className="col-md">
                    File
                    <SortPanel field={'filepath'} sort={sortParams} setSort={setSortParams}/>
                </th>
                <th scope="col" className="col-md-1">Actions</th>
            </tr>
            </thead>
            <tbody>
            {todos.map((todo: ITodo, index: number) => {
                return <TodoItem
                    key={todo.todoId}
                    index={(page - 1) * limit + index + 1}
                    todo={todo}
                    refetch={() => fetchAllTodos({page, limit, filters, sortParams})}
                />
            })}
            </tbody>
        </table>
        {count > limit &&
        <Pagination currentPage={page} pageCount={Math.ceil(count / limit)}
                    onPageChange={selectedItem => setPage(selectedItem.selected + 1)}/>}
    </>)
}

export default TodoList;
