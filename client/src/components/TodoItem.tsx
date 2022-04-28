import React, {useEffect, useState} from "react";
import {Button} from "react-bootstrap";
import {Pencil, X} from "react-bootstrap-icons";
import EditTodoModal from "./modals/EditTodoModal";
import {daysLeft, getFileName, isOverdue} from "../utils/converter";
import {ITodo} from "../models/todo/ITodo";
import {useTypedSelector} from "../hooks/useTypedSelector";
import useSocket from "../hooks/useSocket";
import {useActions} from "../hooks/useActions";

interface TodoItemProps {
    index: number,
    todo: ITodo,
    refetch: () => void
}

const TodoItem: React.FC<TodoItemProps> = ({index, todo, refetch}) => {
    const {pagination: {count, limit, page}} = useTypedSelector(store => store.todoReducer);

    const [modalShow, setModalShow] = useState(false);
    const {updateTodo, deleteTodo} = useActions()

    const statusChangeHandler = () => {
        const body = {...todo, completed: !todo.completed};
        updateTodo(body);
    }

    const deleteHandler = async () => {
        await deleteTodo(todo.todoId);

        const pageCount = Math.ceil(count / limit);

        if (page !== pageCount) {
            refetch();
        }
    }

    return (
        <tr className={todo.completed ? 'table-success' : isOverdue(todo.deadline) ? 'table-danger' : 'table-info'}>
            <td>{index}</td>
            <td>
                <div className="d-flex ">
                    <input id="statusCheckBox" className="form-check-input" type="checkbox" name="status"
                    onChange={statusChangeHandler} checked={todo.completed}/>
                    <div className="ms-3">
                        {todo.completed ? 'Completed' : 'In progress'}
                    </div>
                </div>
            </td>
            <td>
                {todo.description}
            </td>
            <td>
                <div className='d-flex justify-content-between '>
                    <div>
                        {new Intl.DateTimeFormat("en-GB", {
                            year: "numeric",
                            month: "long",
                            day: "2-digit"
                        }).format(new Date(todo.deadline))}
                    </div>
                    {/*<div>*/}
                    {/*    ({daysLeft(todo.deadline)})*/}
                    {/*</div>*/}
                </div>
            </td>
            <td>
                {todo.filepath ?
                    <a href={`/${todo.filepath}`} download>{getFileName(todo.filepath)}</a>:
                    <div>&mdash;</div>}
            </td>
            <td>
                <div className="d-flex justify-content-between">
                    <Button variant="warning" onClick={() => setModalShow(true)}>
                        <Pencil/>
                    </Button>
                    <Button variant="danger" onClick={deleteHandler}>
                        <X/>
                    </Button>
                </div>
            </td>
            <EditTodoModal show={modalShow} onHide={() => setModalShow(false)} todo={todo}/>
        </tr>
    );
}

export default TodoItem;
